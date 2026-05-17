const multer = require("multer");
const path = require("path");
const fs = require("fs");

const useMemoryStorage = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
);

const uploadDir = path.join(__dirname, "..", "uploads");
if (!useMemoryStorage) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: useMemoryStorage ? multer.memoryStorage() : diskStorage,
  limits: { fileSize: 50 * 1024 * 1024 },
});

module.exports = upload;
