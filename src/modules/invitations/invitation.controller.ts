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
        cover_title,
        cover_subtitle,
        quote,
        story,
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
          message: "Slug sudah digunakan, silakan pakai slug lain",
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
        cover_title,
        cover_subtitle,
        quote,
        story,
        music_url,
        location_name,
        location_address,
        google_maps_url,
        event_date,
        event_time,
        is_published,
        cover_image,
        gallery_images,
      });

      return res.status(201).json({
        success: true,
        message: "Invitation created successfully",
        data: created,
      });
    } catch (error: any) {
      console.error("CREATE INVITATION ERROR:", error);

      return res.status(500).json({
        success: false,
        message: error.message || "Failed to create invitation",
      });
    }
  },

  async getAll(req: AuthRequest, res: Response) {
    try {
      const user = req.user!;

      const invitations = isAdminRole(user.role)
        ? await InvitationRepository.findAll()
        : await InvitationRepository.findAllByUserId(user.id);

      return res.status(200).json({
        success: true,
        data: invitations,
      });
    } catch (error: any) {
      console.error("GET ALL INVITATIONS ERROR:", error);

      return res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch invitations",
      });
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
        return res.status(404).json({
          success: false,
          message: "Invitation not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: invitation,
      });
    } catch (error: any) {
      console.error("GET INVITATION BY ID ERROR:", error);

      return res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch invitation",
      });
    }
  },

  async update(req: AuthRequest, res: Response) {
    try {
      const user = req.user!;
      const id = Number(req.params.id);

      console.log("UPDATE ID:", id);
      console.log("UPDATE BODY:", req.body);
      console.log("UPDATE USER:", user);

      const {
        user_id,
        slug,
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
      if (existingSlug && Number(existingSlug.id) !== id) {
        return res.status(400).json({
          success: false,
          message: "Slug sudah digunakan, silakan pakai slug lain",
        });
      }

      const updated = isAdminRole(user.role)
        ? await InvitationRepository.updateById(id, req.body)
        : await InvitationRepository.updateByIdAndUserId(id, user.id, req.body);

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: "Invitation not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: updated,
      });
    } catch (error: any) {
      console.error("UPDATE INVITATION ERROR:", error);

      return res.status(500).json({
        success: false,
        message: error.message || "Failed to update invitation",
      });
    }
  },

  async delete(req: AuthRequest, res: Response) {
    try {
      const user = req.user!;
      const id = Number(req.params.id);

      const deleted = isAdminRole(user.role)
        ? await InvitationRepository.deleteById(id)
        : await InvitationRepository.deleteByIdAndUserId(id, user.id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Invitation not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Invitation deleted",
      });
    } catch (error: any) {
      console.error("DELETE INVITATION ERROR:", error);

      return res.status(500).json({
        success: false,
        message: error.message || "Failed to delete invitation",
      });
    }
  },

  async getBySlugPublic(req: Request, res: Response) {
    try {
      const slug = req.params.slug.toString();
      const invitation = await InvitationRepository.findBySlug(slug);

      if (!invitation) {
        return res.status(404).json({
          success: false,
          message: "Invitation not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: invitation,
      });
    } catch (error: any) {
      console.error("GET INVITATION BY SLUG ERROR:", error);

      return res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch invitation",
      });
    }
  },
};