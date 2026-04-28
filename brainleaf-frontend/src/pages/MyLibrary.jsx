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
            <img src={fileUrl(book.file)} className="h-40 w-full" />
            <h3>{book.title}</h3>

            <button
              onClick={() =>
                window.open(
                  apiUrl(`/api/books/${book._id}/read`),
                  "_blank"
                )
              }
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