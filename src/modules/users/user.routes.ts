import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { allowRoles } from "../../middlewares/role.middlewares";
import { UserController } from "./user.controller";

const router = Router();

router.get(
  "/assignable",
  authMiddleware,
  allowRoles("admin", "superadmin"),
  UserController.getAssignableUsers
);

router.get(
  "/",
  authMiddleware,
  allowRoles("admin", "superadmin"),
  UserController.getAllUsers
);

export default router;