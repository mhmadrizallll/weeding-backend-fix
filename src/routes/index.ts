import { Router } from "express";
import invitationRoutes from "../modules/invitations/invitation.routes";
import rsvpRoutes from "../modules/rsvps/rsvp.routes";

import uploadRoutes from "../modules/uploads/upload.routes";

import authRoutes from "../modules/auth/auth.routes";

const router = Router();

router.use("/invitations", invitationRoutes);
router.use("/rsvps", rsvpRoutes);

router.use("/uploads", uploadRoutes);

router.use("/auth", authRoutes);


export default router;