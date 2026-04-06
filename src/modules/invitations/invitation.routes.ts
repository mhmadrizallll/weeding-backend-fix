import { Router } from "express";
import { InvitationController } from "./invitation.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { allowRoles } from "../../middlewares/role.middlewares";

const router = Router();

// PUBLIC
router.get("/public/:slug", InvitationController.getBySlugPublic);

// PRIVATE
router.get("/", authMiddleware, InvitationController.getAll);
router.get("/:id", authMiddleware, InvitationController.getById);

// ONLY ADMIN / SUPERADMIN
router.post(
  "/",
  authMiddleware,
  allowRoles("admin", "superadmin"),
  InvitationController.create
);

router.put(
  "/:id",
  authMiddleware,
  allowRoles("admin", "superadmin"),
  InvitationController.update
);

router.delete(
  "/:id",
  authMiddleware,
  allowRoles("admin", "superadmin"),
  InvitationController.delete
);

export default router;

// router.get("/", authMiddleware, InvitationController.getAll);
// router.get("/slug/:slug", authMiddleware, InvitationController.getBySlugPublic);
// router.get("/:id", authMiddleware, InvitationController.getById);
// router.post("/", authMiddleware, InvitationController.create);
// router.put("/:id", authMiddleware, InvitationController.update);
// router.delete("/:id", authMiddleware, InvitationController.delete);

