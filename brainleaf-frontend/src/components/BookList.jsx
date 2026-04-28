import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiUrl, fileUrl } from "../utils/api";

const BookList = ({ search = "", category = "All" }) => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(apiUrl("/api/books"));
        setBooks(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.log(err);
        setBooks([]);
      }
    };

    fetchBooks();
  }, []);

  const safeBooks = Array.isArray(books) ? books : [];

  const filteredBooks = safeBooks.filter((book) => {
    const query = search.trim().toLowerCase();

    const title = book.title?.toLowerCase() || "";
    const author = book.author?.toLowerCase() || "";
    const bookCategory = book.category || "All";

    return (
      (!query || title.includes(query) || author.includes(query)) &&
      (category === "All" || bookCategory === category)
    );
  });

  return (
    <div className="px-4 py-12 bg-gray-50 md:px-12 md:py-16">
      <h2 className="text-3xl font-bold mb-8">All Books</h2>

      {filteredBooks.length === 0 && (
        <p className="text-gray-500">No books found</p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBooks.map((book) => (
          <div
            key={book._id}
            onClick={() => navigate(`/book/${book._id}`)}
            className="bg-white p-4 rounded-xl shadow cursor-pointer"
          >
            <img
              src={fileUrl(book.file)}
              className="h-40 w-full object-cover rounded"
            />

            <h3 className="mt-3 font-semibold">{book.title}</h3>
            <p className="text-gray-500">{book.author || "Unknown"}</p>
            <p className="text-green-600 font-bold">₹{book.price || 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;