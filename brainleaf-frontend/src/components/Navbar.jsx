import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ setSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(null);

  useEffect(() => {
    const checkToken = () => {
      setToken(localStorage.getItem("token"));
    };

    checkToken();

    // 🔥 listen for storage change (important)
    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("storage", checkToken);
    };
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <div className="w-full shadow-sm bg-white px-4 py-3 md:px-8 md:py-4 flex items-center justify-between">

      {/* LOGO */}
      <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer">
        <img src="/brainleaf1.png" alt="logo" className="w-8 h-8" />
        <h1 className="text-xl font-bold text-green-600">Brainleaf</h1>
      </div>

      {/* NAV */}
      <div className="hidden md:flex gap-6 text-gray-700 font-medium">

        <p onClick={() => navigate("/books")} className="hover:text-green-600 cursor-pointer">
          Books
        </p>

        <p className="hover:text-green-600 cursor-pointer">Courses</p>
        <p className="hover:text-green-600 cursor-pointer">Audiobooks</p>

        <p onClick={() => navigate("/library")} className="hover:text-green-600 cursor-pointer">
          My Library
        </p>

        {/* 🔥 FIXED */}
        {token ? (
          <p
            onClick={() => navigate("/upload")}
            className="hover:text-green-600 cursor-pointer"
          >
            For Sellers
          </p>
        ) : (
          <p
            onClick={() => navigate("/login")}
            className="text-gray-400 cursor-pointer"
          >
            For Sellers
          </p>
        )}

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 md:gap-4">

        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch && setSearch(e.target.value)}
          className="border px-3 py-1 rounded-md outline-none text-sm md:text-base"
        />

        {!token ? (
          <>
            <button onClick={() => navigate("/login")} className="text-gray-700">
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