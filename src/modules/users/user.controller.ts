import { Request, Response } from "express";
import { UserRepository } from "./user.repository";

export const UserController = {
 async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserRepository.getAllUsers();
      return res.json({
        success: true,
        data: users,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch users",
      });
    }
  },

  async getAssignableUsers(req: Request, res: Response) {
    try {
      const users = await UserRepository.getAssignableUsers();
      return res.json({
        success: true,
        data: users,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch assignable users",
      });
    }
  },
};