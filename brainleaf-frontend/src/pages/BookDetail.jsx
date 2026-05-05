import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { apiUrl, fileUrl } from "../utils/api";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(apiUrl(`/api/books/${id}`));
        setBook(res.data);
      } catch (err) {
        console.log("Book detail error:", err);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const buyBook = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      await axios.post(
        apiUrl(`/api/purchase/${id}`),
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Book purchased successfully");
      navigate(`/read/${id}`);
    } catch (err) {
      const message = err.response?.data?.message || "Purchase failed";

      if (message === "Already purchased") {
        navigate(`/read/${id}`);
        return;
      }

      alert(message);
    }
  };

  if (loading) {
    return <p className="px-6 py-12 text-gray-500">Loading book...</p>;
  }

  if (!book) {
    return <p className="px-6 py-12 text-gray-500">Book not found</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-10 md:px-12">
      <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-[280px_1fr]">
        <div className="bg-white rounded-xl shadow p-4">
          <img
            src={book.coverImage ? fileUrl(book.coverImage) : "/brainleaf1.png"}
            alt={book.title}
            className="w-full h-[380px] object-cover rounded-lg bg-gray-100"
          />
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-green-600 font-semibold">{book.category}</p>
          <h1 className="text-3xl font-bold mt-2">{book.title}</h1>
          <p className="text-gray-600 mt-2">by {book.author || "Unknown"}</p>
          <p className="text-2xl text-green-700 font-bold mt-5">Rs. {book.price || 0}</p>

          {book.description && (
            <p className="text-gray-700 mt-5 leading-7">{book.description}</p>
          )}

          <div className="flex flex-wrap gap-3 mt-8">
            <button
              onClick={buyBook}
              className="bg-green-600 text-white px-5 py-2 rounded-md"
            >
              Buy Now
            </button>

            <button
              onClick={() => navigate(`/read/${id}`)}
              className="border border-green-600 text-green-700 px-5 py-2 rounded-md"
            >
              Read Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
