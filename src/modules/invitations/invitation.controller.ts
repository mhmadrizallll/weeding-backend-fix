import { Request, Response } from "express";
import { InvitationRepository } from "./invitation.repository";
import { AuthRequest } from "../../middlewares/auth.middleware";

const isAdminRole = (role?: string) => {
  return role === "admin" || role === "superadmin";
};

export const InvitationController = {
  async create(req: Request, res: Response) {
    try {
      const {
        user_id,
        template_key,
        slug,
        event_type,
        title,
        groom_name,
        bride_name,
        groom_image, // ✅ NEW
        bride_image, // ✅ NEW
        cover_title,
        cover_subtitle,
        quote,
        story,
        story_images, // ✅ NEW (array)
        music_url,
        location_name,
        location_address,
        google_maps_url,
        event_date,
        event_time,
        is_published,
        cover_image,
        gallery_images,
      } = req.body;

      if (!user_id) {
        return res.status(400).json({
          success: false,
          message: "User pemilik invitation wajib dipilih",
        });
      }

      if (!slug) {
        return res.status(400).json({
          success: false,
          message: "Slug wajib diisi",
        });
      }

      const existingSlug = await InvitationRepository.findBySlugAny(slug);
      if (existingSlug) {
        return res.status(400).json({
          success: false,
          message: "Slug sudah digunakan",
        });
      }

      const created = await InvitationRepository.create({
        user_id,
        template_key,
        slug,
        event_type,
        title,
        groom_name,
        bride_name,
        groom_image,
        bride_image,
        cover_title,
        cover_subtitle,
        quote,
        story,

        // 🔥 FIX DI SINI
        story_images: JSON.stringify(story_images || []),

        music_url,
        location_name,
        location_address,
        google_maps_url,
        event_date,
        event_time,
        is_published,
        cover_image,

        // 🔥 FIX DI SINI
        gallery_images: JSON.stringify(gallery_images || []),
      });

      return res.status(201).json({
        success: true,
        data: created,
      });
    } catch (error: any) {
      console.error("CREATE ERROR:", error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  async getAll(req: AuthRequest, res: Response) {
    try {
      const user = req.user!;

      const invitations = isAdminRole(user.role)
        ? await InvitationRepository.findAll()
        : await InvitationRepository.findAllByUserId(user.id);

      return res.json({ success: true, data: invitations });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  async getById(req: AuthRequest, res: Response) {
    try {
      const user = req.user!;
      const id = Number(req.params.id);

      const invitation = isAdminRole(user.role)
        ? await InvitationRepository.findById(id)
        : await InvitationRepository.findByIdAndUserId(id, user.id);

      if (!invitation) {
        return res.status(404).json({ success: false });
      }

      return res.json({ success: true, data: invitation });
    } catch (error: any) {
      return res.status(500).json({ success: false });
    }
  },

  async update(req: AuthRequest, res: Response) {
    try {
      const user = req.user!;
      const id = Number(req.params.id);

      const { slug, user_id } = req.body;

      if (!user_id || !slug) {
        return res.status(400).json({ success: false });
      }

      const existingSlug = await InvitationRepository.findBySlugAny(slug);
      if (existingSlug && Number(existingSlug.id) !== id) {
        return res.status(400).json({
          success: false,
          message: "Slug sudah digunakan",
        });
      }

      const updated = isAdminRole(user.role)
        ? await InvitationRepository.updateById(id, req.body)
        : await InvitationRepository.updateByIdAndUserId(id, user.id, req.body);

      return res.json({ success: true, data: updated });
    } catch (error: any) {
      return res.status(500).json({ success: false });
    }
  },

  async delete(req: AuthRequest, res: Response) {
    try {
      const user = req.user!;
      const id = Number(req.params.id);

      const deleted = isAdminRole(user.role)
        ? await InvitationRepository.deleteById(id)
        : await InvitationRepository.deleteByIdAndUserId(id, user.id);

      return res.json({ success: true, data: deleted });
    } catch {
      return res.status(500).json({ success: false });
    }
  },

  async getBySlugPublic(req: Request, res: Response) {
    try {
      const slug = req.params.slug.toString();

      const invitation = await InvitationRepository.findBySlug(slug);

      if (!invitation) {
        return res.status(404).json({ success: false });
      }

      return res.json({ success: true, data: invitation });
    } catch {
      return res.status(500).json({ success: false });
    }
  },
};
