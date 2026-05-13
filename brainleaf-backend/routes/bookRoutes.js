const express = require("express");
const router = express.Router();
const { readBook } = require("../controllers/bookController");
console.log("Book routes loaded");
const {
  createBook,
  getBooks
} = require("../controllers/bookController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { getBookById } = require("../controllers/bookController");

const uploadBookFiles = (req, res, next) => {
  const middleware = upload.fields([
    { name: "file", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]);

  middleware(req, res, (error) => {
    if (!error) {
      return next();
    }

    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "File too large. Please upload files smaller than 50MB.",
      });
    }

    return res.status(400).json({
      message: error.message || "File upload failed",
    });
  });
};

// upload book (protected)
router.post(
  "/",
  protect,
  uploadBookFiles,
  createBook
);

// get books
router.get("/", getBooks);
router.get("/:id/read", protect, readBook);
router.get("/:id", getBookById);

module.exports = router;
