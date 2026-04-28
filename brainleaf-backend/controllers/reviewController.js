const Review = require("../models/Review");

// ✍️ ADD REVIEW
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.create({
      user: req.user._id,
      book: req.params.bookId,
      rating,
      comment,
    });

    res.json({
      message: "Review added",
      review,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📖 GET REVIEWS
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId })
      .populate("user", "name");

    res.json(reviews);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};