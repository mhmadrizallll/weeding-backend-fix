import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export const AuthController = {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const result = await AuthService.register(name, email, password);

      return res.status(201).json({
        success: true,
        message: "Register success",
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message || "Register failed",
      });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const result = await AuthService.login(email, password);

      return res.status(200).json({
        success: true,
        message: "Login success",
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message || "Login failed",
      });
    }
  },

  async me(req: Request, res: Response) {
    try {
      const user = (req as any).user;

      const result = await AuthService.me(user.id);

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message || "Failed to fetch user",
      });
    }
  },
};