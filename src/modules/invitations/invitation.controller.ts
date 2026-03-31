import { Request, Response } from "express";
import { InvitationService } from "./invitation.service";

export const InvitationController = {
  async getAll(req: Request, res: Response) {
    try {
      const data = await InvitationService.getAll();
      res.json({ success: true, data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to fetch invitations" });
    }
  },

  async getBySlug(req: Request, res: Response) {
    try {
      const slug = req.params.slug.toString();
      const data = await InvitationService.getBySlug(slug);

      if (!data) {
        return res.status(404).json({ success: false, message: "Invitation not found" });
      }

      res.json({ success: true, data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to fetch invitation" });
    }
  },

  async getById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await InvitationService.getById(Number(id));

        if (!data) {
        return res.status(404).json({
            success: false,
            message: "Invitation not found",
        });
        }

        res.json({ success: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({
        success: false,
        message: "Failed to fetch invitation by id",
        });
    }
    },

  async create(req: Request, res: Response) {
    try {
      const data = await InvitationService.create(req.body);
      res.status(201).json({ success: true, data });
    } catch (error: any) {
      console.error(error);

      if (error.code === "ER_DUP_ENTRY") {
        return res.status(400).json({
          success: false,
          message: "Slug already exists",
        });
      }

      res.status(500).json({ success: false, message: "Failed to create invitation" });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const existing = await InvitationService.getById(Number(id));
      if (!existing) {
        return res.status(404).json({ success: false, message: "Invitation not found" });
      }

      const data = await InvitationService.update(Number(id), req.body);
      res.json({ success: true, data });
    } catch (error: any) {
      console.error(error);

      if (error.code === "ER_DUP_ENTRY") {
        return res.status(400).json({
          success: false,
          message: "Slug already exists",
        });
      }

      res.status(500).json({ success: false, message: "Failed to update invitation" });
    }
  },

  async delete(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const existing = await InvitationService.getById(Number(id));
    if (!existing) {
      return res.status(404).json({ success: false, message: "Invitation not found" });
    }

    await InvitationService.delete(Number(id));

    res.json({
      success: true,
      message: "Invitation deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to delete invitation" });
  }
}
};