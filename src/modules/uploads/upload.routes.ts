import { Router } from "express";
import { UploadController } from "./upload.controller";
import { uploadImage, uploadMusic } from "../../middlewares/upload.middleware";

const router = Router();

router.post("/image", uploadImage.single("file"), UploadController.uploadImage);
router.post("/music", uploadMusic.single("file"), UploadController.uploadMusic);

export default router;