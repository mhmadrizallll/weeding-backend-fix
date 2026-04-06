import { Router } from "express";
import invitationRoutes from "../modules/invitations/invitation.routes";
import rsvpRoutes from "../modules/rsvps/rsvp.routes";

import uploadRoutes from "../modules/uploads/upload.routes";

import authRoutes from "../modules/auth/auth.routes";

import userRoutes from "../modules/users/user.routes";

const router = Router();

router.use("/users", userRoutes);

router.use("/invitations", invitationRoutes);
router.use("/rsvps", rsvpRoutes);

router.use("/uploads", uploadRoutes);

router.use("/auth", authRoutes);


// router.use("/api/invitations", invitationRoutes);


export default router;