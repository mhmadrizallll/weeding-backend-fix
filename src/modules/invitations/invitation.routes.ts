import { Router } from "express";
import { InvitationController } from "./invitation.controller";

const router = Router();

router.get("/", InvitationController.getAll);
router.get("/slug/:slug", InvitationController.getBySlug);
router.get("/:id", InvitationController.getById);
router.post("/", InvitationController.create);
router.put("/:id", InvitationController.update);
router.delete("/:id", InvitationController.delete);

export default router;