const Book = require("../models/Book");
const path = require("path");
const Purchase = require("../models/Purchase");


// 📚 CREATE BOOK
exports.createBook = async (req, res) => {
  try {
    const { title, author, description, price, category } = req.body;

    // 🔥 validation
    if (!title || !price || !req.file || !category) {
      return res.status(400).json({
        message: "Title, price, category and file are required",
      });
    }

    const book = await Book.create({
      title,
      author,
      description,
      price,
      category,
      file: req.file.path.replace(/\\/g, "/"),
      uploadedBy: req.user._id,
    });

    res.status(201).json({
      message: "Book uploaded successfully",
      book,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 📚 GET ALL BOOKS (with optional filters)
exports.getBooks = async (req, res) => {
  try {
    const { category, search } = req.query;

    let filter = {};

    // 🔥 category filter
    if (category && category !== "All") {
      filter.category = category;
    }

    // 🔥 search filter (title based)
    if (search) {
      filter.title = {
        $regex: search,
        $options: "i", // case insensitive
      };
    }

    const books = await Book.find(filter).populate(
      "uploadedBy",
      "name email"
    );

    res.json(books);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 📖 GET SINGLE BOOK
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 📖 READ BOOK (secure)
exports.readBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    // 🔥 check purchase
    const purchase = await Purchase.findOne({
      user: req.user._id,
      book: bookId,
    });

    if (!purchase) {
      return res.status(403).json({
        message: "You have not purchased this book",
      });
    }

    // 🔥 get book
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // 🔥 send file
    const filePath = path.resolve(book.file);

    res.sendFile(filePath);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};