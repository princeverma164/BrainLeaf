const Book = require("../models/Book");
const path = require("path");
const fs = require("fs");
const Purchase = require("../models/Purchase");

// 📚 CREATE BOOK
exports.createBook = async (req, res) => {
  try {
    const { title, author, description, price, category } = req.body;
    const bookFile = req.files?.file?.[0];
    const coverFile = req.files?.coverImage?.[0];

    if (!title || !price || !bookFile || !category) {
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
      file: `uploads/${bookFile.filename}`,
      coverImage: coverFile ? `uploads/${coverFile.filename}` : "",
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

// 📚 GET ALL BOOKS
exports.getBooks = async (req, res) => {
  try {
    const { category, search } = req.query;

    let filter = {};

    if (category && category !== "All") {
      filter.category = category;
    }

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
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

// 📖 READ BOOK (FINAL FIXED)
exports.readBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    // 🔥 get book
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const isOwner = book.uploadedBy?.toString() === req.user._id.toString();

    // 🔥 check purchase
    const purchase = await Purchase.findOne({
      user: req.user._id,
      book: bookId,
    });

    if (!purchase && !isOwner) {
      return res.status(403).json({
        message: "You have not purchased this book",
      });
    }

    // 🔥 FINAL PATH FIX
    const filePath = path.join(__dirname, "..", book.file);

    console.log("Serving file from:", filePath);

    // 🔥 FILE EXIST CHECK (VERY IMPORTANT)
    if (!fs.existsSync(filePath)) {
      console.log("File NOT FOUND:", filePath);
      return res.status(404).json({
        message: "File not found on server",
      });
    }

    // 🔥 SEND FILE
    res.sendFile(filePath);

  } catch (error) {
    console.log("ReadBook error:", error);
    res.status(500).json({ message: error.message });
  }
};
