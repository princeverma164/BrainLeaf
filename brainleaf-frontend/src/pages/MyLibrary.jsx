import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl, fileUrl } from "../utils/api";

const MyLibrary = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          apiUrl("/api/purchase/my-books"),
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setBooks(Array.isArray(res.data?.books) ? res.data.books : []);
      } catch (err) {
        console.log(err);
        setBooks([]);
      }
    };

    fetchLibrary();
  }, []);

  return (
    <div className="px-12 py-16">
      <h1 className="text-3xl font-bold mb-8">My Library</h1>

      <div className="grid grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book._id} className="bg-white p-4 rounded shadow">
            <img
              src={book.coverImage ? fileUrl(book.coverImage) : "/brainleaf1.png"}
              alt={book.title}
              className="h-40 w-full object-cover"
            />
            <h3>{book.title}</h3>

            <button
              onClick={() => navigate(`/read/${book._id}`)}
              className="bg-green-600 text-white px-3 py-2 mt-2"
            >
              Read
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLibrary;
