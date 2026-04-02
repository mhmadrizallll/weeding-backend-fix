import { Request, Response } from "express";

export const UploadController = {
  uploadImage(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No image uploaded",
        });
      }

      const fileUrl = `${req.protocol}://${req.get("host")}/uploads/images/${req.file.filename}`;

      return res.status(201).json({
        success: true,
        message: "Image uploaded successfully",
        data: {
          url: fileUrl,
          filename: req.file.filename,
        },
      });
    } catch (error) {
      console.error("UPLOAD IMAGE ERROR:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to upload image",
      });
    }
  },

  uploadMusic(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No music uploaded",
        });
      }

      const fileUrl = `${req.protocol}://${req.get("host")}/uploads/music/${req.file.filename}`;

      return res.status(201).json({
        success: true,
        message: "Music uploaded successfully",
        data: {
          url: fileUrl,
          filename: req.file.filename,
        },
      });
    } catch (error) {
      console.error("UPLOAD MUSIC ERROR:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to upload music",
      });
    }
  },
};