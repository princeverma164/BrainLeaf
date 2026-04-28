import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Features from "./components/Features";
import BookList from "./components/BookList";
import FeedbackSection from "./components/FeedbackSection";

import BookDetail from "./pages/BookDetail";
import MyLibrary from "./pages/MyLibrary";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UploadBook from "./pages/UploadBook";
import ProtectedRoute from "./components/ProtectedRoute";
import ReadBook from "./pages/ReadBook";

// 🔥 UPDATED: BooksPage now supports category
const BooksPage = ({ search, category }) => {
  return <BookList search={search} category={category} />;
};

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All"); // 🔥 NEW

  return (
    <div>
      {/* Navbar */}
      <Navbar setSearch={setSearch} setCategory={setCategory} />

      <Routes>

        {/* 🔥 LANDING PAGE */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Categories setCategory={setCategory} /> {/* 🔥 IMPORTANT */}
              <Features />
              <FeedbackSection />
            </>
          }
        />

        {/* 🔥 BOOKS PAGE */}
        <Route
          path="/books"
          element={
            <BooksPage search={search} category={category} />
          }
        />

        {/* BOOK DETAIL */}
        <Route path="/book/:id" element={<BookDetail />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔒 PROTECTED ROUTES */}
        <Route
          path="/library"
          element={
            <ProtectedRoute>
              <MyLibrary />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadBook />
            </ProtectedRoute>
          }
        />

        {/* 📖 READER */}
        <Route path="/read/:id" element={<ReadBook />} />

      </Routes>
    </div>
  );
}

export default App;
