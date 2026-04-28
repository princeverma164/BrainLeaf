const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  photo: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model("Feedback", feedbackSchema);
