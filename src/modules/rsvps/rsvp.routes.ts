import { Router } from "express";
import { RsvpController } from "./rsvp.controller";

const router = Router();

router.get("/invitation/:invitationId", RsvpController.getByInvitationId);
router.get("/:id", RsvpController.getById);

router.post("/", RsvpController.create);

export default router;