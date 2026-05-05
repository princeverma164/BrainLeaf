require("dotenv").config(); 

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();

// DB connect
connectDB();

app.use(express.json()); // body parse करेगा
app.use(cors({
  origin: "*", // production में specific domain डाल सकते हो
}));

app.get("/", (req, res) => {
  res.send("Brainleaf API running 🚀"); // ✅ correct method
});

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/purchase", purchaseRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/feedback", feedbackRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
