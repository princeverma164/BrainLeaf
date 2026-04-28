import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl, fileUrl } from "../utils/api";

const MyLibrary = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          apiUrl("/api/purchase/my-books"),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBooks(res.data.books);
      } catch (err) {
        console.log(err);
      }
    };

    fetchLibrary();
  }, []);

  return (
    <div className="px-4 py-12 md:px-12 md:py-16">

      <h1 className="text-3xl font-bold mb-8">My Library</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">

        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white p-4 rounded-xl shadow-sm"
          >
            <img
              src={fileUrl(book.file)}
              alt={book.title}
              className="h-40 w-full object-cover rounded-md"
            />

            <h3 className="mt-3 font-semibold">{book.title}</h3>

            <button
              onClick={() =>
                window.open(
                  apiUrl(`/api/books/${book._id}/read`),
                  "_blank"
                )
              }
              className="mt-3 bg-green-600 text-white px-4 py-2 rounded-md"
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
