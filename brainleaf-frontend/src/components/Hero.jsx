import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate(); // 🔥 navigation

  return (
    <div className="w-full px-4 py-10 flex flex-col gap-10 items-center justify-between bg-white md:px-12 md:py-16 lg:flex-row">

      {/* LEFT SIDE */}
      <div className="w-full space-y-6 text-center lg:w-1/2 lg:text-left">

        {/* Tag */}
        <p className="text-green-600 bg-green-100 px-3 py-1 rounded-full w-fit mx-auto text-sm lg:mx-0">
          Your All-in-One Knowledge Platform
        </p>

        {/* Heading */}
        <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
          Read. Listen.
          <br />
          Learn. <span className="text-green-600">Grow.</span>
        </h1>

        {/* Description */}
        <p className="text-gray-500">
          Access thousands of books, audiobooks and expert-led courses in one place.
          Learn anything, anytime, anywhere.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
          <button
            onClick={() => navigate("/books")} // 🔥 MAIN CHANGE
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
          >
            Explore Now →
          </button>

          <button className="border px-6 py-2 rounded-md hover:bg-gray-100">
            Start Free Trial
          </button>
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-3 pt-4 text-sm text-gray-600 sm:flex-row sm:justify-center lg:justify-start lg:gap-8">
          <p>📚 50K+ Books</p>
          <p>🎥 5K+ Courses</p>
          <p>👨‍🏫 10K+ Instructors</p>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="w-full flex justify-center lg:w-1/2">
        <img
          src="/hero.png"
          alt="hero"
          className="w-full max-w-[600px] h-auto"
        />
      </div>

    </div>
  );
};

export default Hero;
