const Feedback = require("../models/Feedback");

exports.createFeedback = async (req, res) => {
  try {
    const name = req.body.name?.trim();
    const message = req.body.message?.trim();

    if (!name || !message) {
      return res.status(400).json({ message: "Name and feedback are required" });
    }

    const feedback = await Feedback.create({
      name,
      message,
      photo: req.file ? req.file.path.replace(/\\/g, "/") : "",
    });

    res.status(201).json({
      message: "Feedback added successfully",
      feedback,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
