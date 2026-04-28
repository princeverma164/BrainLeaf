const express = require("express");
const router = express.Router();

console.log("Purchase routes loaded");

const {
  buyBook,
  getMyLibrary
} = require("../controllers/purchaseController");

const { protect } = require("../middleware/authMiddleware");

// 📚 my library
router.get("/my-books", protect, getMyLibrary);

// 💰 buy book
router.post("/:bookId", protect, buyBook);

module.exports = router;