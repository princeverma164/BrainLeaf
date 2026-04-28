import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { apiUrl } from "../utils/api";

const Navbar = ({ setSearch, setCategory }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [location.pathname]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(apiUrl("/api/books"));
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBooks();
  }, []);

  const suggestions = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return [];

    return books
      .filter((book) => {
        const title = book.title?.toLowerCase() || "";
        const author = book.author?.toLowerCase() || "";
        return title.includes(value) || author.includes(value);
      })
      .slice(0, 5);
  }, [books, query]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSearch(value);
    setCategory("All");
    setShowSuggestions(true);

    if (location.pathname !== "/books") {
      navigate("/books");
    }
  };

  const handleSuggestionClick = (book) => {
    setQuery(book.title);
    setSearch(book.title);
    setCategory("All");
    setShowSuggestions(false);
    navigate(`/book/${book._id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <div className="w-full shadow-sm bg-white px-4 py-4 flex flex-col gap-4 lg:px-8 lg:flex-row lg:items-center lg:justify-between">
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <img src="/brainleaf1.png" alt="logo" className="w-14 h-14 object-contain" />
      </div>

      <div className="w-full flex flex-wrap justify-center gap-4 text-gray-700 font-medium lg:w-auto lg:gap-6">
        <p
          onClick={() => navigate("/books")}
          className="hover:text-green-600 cursor-pointer"
        >
          Books
        </p>
        <p className="hover:text-green-600 cursor-pointer">Courses</p>
        <p className="hover:text-green-600 cursor-pointer">Audiobooks</p>
        <p
          onClick={() => navigate("/library")}
          className="hover:text-green-600 cursor-pointer"
        >
          My Library
        </p>
        {token && (
          <p
            onClick={() => navigate("/upload")}
            className="hover:text-green-600 cursor-pointer"
          >
            Upload
          </p>
        )}
      </div>

      <div className="w-full flex flex-col gap-3 sm:flex-row sm:items-center lg:w-auto lg:gap-4">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={query}
            placeholder="Search books..."
            onChange={handleSearchChange}
            onFocus={() => {
              setShowSuggestions(true);
              if (location.pathname !== "/books") navigate("/books");
            }}
            className="border px-3 py-2 rounded-md outline-none w-full"
          />

          {showSuggestions && query.trim() && (
            <div className="absolute top-12 left-0 w-full bg-white border rounded-md shadow-md z-10">
              {suggestions.length > 0 ? (
                suggestions.map((book) => (
                  <button
                    key={book._id}
                    type="button"
                    onMouseDown={() => handleSuggestionClick(book)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100"
                  >
                    <p className="font-medium">{book.title}</p>
                    <p className="text-sm text-gray-500">{book.author}</p>
                  </button>
                ))
              ) : (
                <p className="px-3 py-2 text-sm text-gray-500">
                  No suggestions
                </p>
              )}
            </div>
          )}
        </div>

        {!token ? (
          <>
            <button
              onClick={() => navigate("/login")}
              className="text-gray-700"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Sign Up
            </button>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
