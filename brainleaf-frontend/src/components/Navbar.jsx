import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ setSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <div className="w-full shadow-sm bg-white px-4 py-3 md:px-8 md:py-4 flex items-center justify-between">

      {/* LOGO */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <img src="/logo.png" alt="logo" className="w-8 h-8" />
        <h1 className="text-xl font-bold text-green-600">Brainleaf</h1>
      </div>

      {/* NAV */}
      <div className="hidden md:flex gap-6 text-gray-700 font-medium">

        <p
          onClick={() => navigate("/books")}
          className="hover:text-green-600 cursor-pointer"
        >
          Books
        </p>

        <p className="hover:text-green-600 cursor-pointer">
          Courses
        </p>

        <p className="hover:text-green-600 cursor-pointer">
          Audiobooks
        </p>

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

      {/* RIGHT */}
      <div className="flex items-center gap-3 md:gap-4">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch && setSearch(e.target.value)}
          className="border px-3 py-1 rounded-md outline-none text-sm md:text-base"
        />

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
              className="bg-green-600 text-white px-4 py-1 rounded-md"
            >
              Sign Up
            </button>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded-md"
          >
            Logout
          </button>
        )}

      </div>
    </div>
  );
};

export default Navbar;