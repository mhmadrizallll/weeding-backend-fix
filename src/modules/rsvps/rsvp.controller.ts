import { Request, Response } from "express";
import { RsvpRepository } from "./rsvp.repository";

export const RsvpController = {
  async create(req: Request, res: Response) {
    try {
      const rsvp = await RsvpRepository.create(req.body);

      return res.status(201).json({
        success: true,
        data: rsvp,
      });
    } catch (error) {
      console.error("CREATE RSVP ERROR:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to create RSVP",
      });
    }
  },

  async getByInvitationId(req: Request, res: Response) {
    try {
      const invitationId = Number(req.params.invitationId);

      if (isNaN(invitationId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid invitation id",
        });
      }

      const rsvps = await RsvpRepository.findByInvitationId(invitationId);

      return res.status(200).json({
        success: true,
        data: rsvps,
      });
    } catch (error) {
      console.error("GET RSVP BY INVITATION ERROR:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch RSVPs",
      });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid RSVP id",
        });
      }

      const rsvp = await RsvpRepository.findById(id);

      if (!rsvp) {
        return res.status(404).json({
          success: false,
          message: "RSVP not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: rsvp,
      });
    } catch (error) {
      console.error("GET RSVP BY ID ERROR:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch RSVP",
      });
    }
  },
};