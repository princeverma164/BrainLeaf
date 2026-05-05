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

// upload book (protected)
router.post(
  "/",
  protect,
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  createBook
);

// get books
router.get("/", getBooks);
router.get("/:id/read", protect, readBook);
router.get("/:id", getBookById);

module.exports = router;
