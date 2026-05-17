const Book = require("../models/Book");
const path = require("path");
const fs = require("fs");
const { PassThrough } = require("stream");
const cloudinary = require("cloudinary").v2;
const Purchase = require("../models/Purchase");

const isCloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
);
const isProduction = process.env.NODE_ENV === "production";
const allowLocalUploads = process.env.ALLOW_LOCAL_UPLOADS === "true";

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

const isRemoteUrl = (value = "") => /^https?:\/\//i.test(value);

const uploadBufferToCloudinary = (file, options) =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(result.secure_url);
    });

    const bufferStream = new PassThrough();
    bufferStream.end(file.buffer);
    bufferStream.pipe(uploadStream);
  });

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

    if (isProduction && !isCloudinaryConfigured && !allowLocalUploads) {
      return res.status(500).json({
        message:
          "Cloud storage is not configured. Add Cloudinary environment variables before uploading books in production.",
      });
    }

    let filePath = `uploads/${bookFile.filename}`;
    let coverImagePath = coverFile ? `uploads/${coverFile.filename}` : "";

    if (isCloudinaryConfigured) {
      filePath = await uploadBufferToCloudinary(bookFile, {
        folder: "brainleaf/books",
        resource_type: "raw",
      });

      if (coverFile) {
        coverImagePath = await uploadBufferToCloudinary(coverFile, {
          folder: "brainleaf/covers",
          resource_type: "image",
        });
      }
    }

    const book = await Book.create({
      title,
      author,
      description,
      price,
      category,
      file: filePath,
      coverImage: coverImagePath,
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

    const books = await Book.find(filter)
      .sort({ createdAt: -1 })
      .populate("uploadedBy", "name email");

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
    if (isRemoteUrl(book.file)) {
      const fileResponse = await fetch(book.file);

      if (!fileResponse.ok) {
        return res.status(404).json({
          message: "File not found on storage",
        });
      }

      const fileBuffer = Buffer.from(await fileResponse.arrayBuffer());
      res.setHeader("Content-Type", "application/pdf");
      return res.send(fileBuffer);
    }

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
