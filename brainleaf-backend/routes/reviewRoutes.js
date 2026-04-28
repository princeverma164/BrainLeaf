const express = require("express");
const router = express.Router();

const {
  addReview,
  getReviews
} = require("../controllers/reviewController");

const { protect } = require("../middleware/authMiddleware");

// add review
router.post("/:bookId", protect, addReview);

// get reviews
router.get("/:bookId", getReviews);

module.exports = router;