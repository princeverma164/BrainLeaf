import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Self Help", items: "1200+ Items" },
  { name: "Business", items: "1500+ Items" },
  { name: "Tech", items: "1000+ Items" }, // 🔥 backend ke match me
  { name: "Health & Fitness", items: "800+ Items" },
  { name: "Fiction", items: "2000+ Items" },
  { name: "Language", items: "600+ Items" },
];

const Categories = ({ setCategory }) => {
  const navigate = useNavigate();

  const handleClick = (catName) => {
    setCategory(catName);     // 🔥 filter set
    navigate("/books");       // 🔥 books page open
  };

  return (
    <div className="w-full px-4 py-12 bg-gray-50 md:px-12 md:py-16">

      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Explore by Category</h2>
        <p className="text-gray-500">
          Choose from a wide range of topics that interest you
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">

        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => handleClick(cat.name)} // 🔥 CLICK WORKING
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md hover:scale-[1.03] transition cursor-pointer"
          >
            <div className="text-2xl mb-3">📚</div>

            <h3 className="font-semibold">{cat.name}</h3>
            <p className="text-gray-500 text-sm">{cat.items}</p>
          </div>
        ))}

      </div>

    </div>
  );
};

export default Categories;
