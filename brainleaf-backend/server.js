require("dotenv").config(); 

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();

// DB connect
connectDB();

// middleware
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("Brainleaf API running 🚀"); // ✅ correct method
});

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/purchase", purchaseRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/feedbacks", feedbackRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
