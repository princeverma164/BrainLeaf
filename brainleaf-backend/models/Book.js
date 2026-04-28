const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  file: {
    type: String, // PDF path
    required: true,
  },
  coverImage: {
    type: String, // image path
  },
  category: {
  type: String,
  required: true,
},
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);