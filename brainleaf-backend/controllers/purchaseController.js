const Purchase = require("../models/Purchase");
const Book = require("../models/Book");

// 💰 BUY BOOK
exports.buyBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // check already purchased
    const alreadyBought = await Purchase.findOne({
      user: req.user._id,
      book: book._id,
    });

    if (alreadyBought) {
      return res.status(400).json({ message: "Already purchased" });
    }

    const purchase = await Purchase.create({
      user: req.user._id,
      book: book._id,
      price: book.price,
    });

    res.json({
      message: "Book purchased successfully",
      purchase,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// 📚 GET USER LIBRARY
exports.getMyLibrary = async (req, res) => {
  try {
    const purchases = await Purchase.find({ user: req.user._id })
      .populate("book"); // 👈 important

    const books = purchases.map(p => p.book);

    res.json({
      count: books.length,
      books,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};