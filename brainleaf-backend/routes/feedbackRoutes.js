const express = require("express");
const router = express.Router();

const {
  createFeedback,
  getFeedbacks,
} = require("../controllers/feedbackController");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/", getFeedbacks);
router.post("/", upload.single("photo"), createFeedback);

module.exports = router;