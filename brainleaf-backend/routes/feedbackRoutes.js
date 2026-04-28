const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const {
  createFeedback,
  getFeedbacks,
} = require("../controllers/feedbackController");

router.get("/", getFeedbacks);
router.post("/", upload.single("photo"), createFeedback);

module.exports = router;
