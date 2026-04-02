import { Request, Response } from "express";
import { InvitationRepository } from "./invitation.repository";
import { AuthRequest } from "../../middlewares/auth.middleware";

const isAdminRole = (role?: string) => {
  return role === "admin" || role === "superadmin";
};

export const InvitationController = {
  async create(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;

      const invitation = await InvitationRepository.create({
        ...req.body,
        user_id: userId,
      });

      return res.status(201).json({
        success: true,
        data: invitation,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Failed to create invitation",
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
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch invitations",
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
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch invitation",
      });
    }
  },

  async update(req: AuthRequest, res: Response) {
    try {
      const user = req.user!;
      const id = Number(req.params.id);

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
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to update invitation",
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
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete invitation",
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
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch invitation",
      });
    }
  },
};