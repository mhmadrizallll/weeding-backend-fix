import { Router } from "express";
import invitationRoutes from "../modules/invitations/invitation.routes";
const router = Router();

router.use("/invitations", invitationRoutes);

export default router;