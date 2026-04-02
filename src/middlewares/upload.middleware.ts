import multer from "multer";
import path from "path";
import fs from "fs";

const ensureDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const imageDir = path.join(process.cwd(), "uploads/images");
const musicDir = path.join(process.cwd(), "uploads/music");

ensureDir(imageDir);
ensureDir(musicDir);

const imageStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, imageDir);
  },
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;
    cb(null, uniqueName);
  },
});

const musicStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, musicDir);
  },
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;
    cb(null, uniqueName);
  },
});

const imageFileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

const musicFileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  if (file.mimetype.startsWith("audio/")) {
    cb(null, true);
  } else {
    cb(new Error("Only audio files are allowed"));
  }
};

export const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export const uploadMusic = multer({
  storage: musicStorage,
  fileFilter: musicFileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});