import React from "react";

const Features = () => {
  return (
    <div className="w-full px-4 py-12 flex flex-col gap-10 bg-white md:px-12 md:py-16 lg:flex-row">

      {/* LEFT */}
      <div className="w-full space-y-6 lg:w-1/2">

        <p className="text-green-600 text-sm">Why Brainleaf?</p>

        <h2 className="text-3xl font-bold">
          Everything you need to{" "}
          <span className="text-green-600">learn and grow</span>
        </h2>

        <p className="text-gray-500">
          Brainleaf is designed for learners and creators. Get unlimited
          access to knowledge and turn your knowledge into income.
        </p>

        <button className="bg-green-600 text-white px-6 py-2 rounded-md">
          Learn More →
        </button>

      </div>

      {/* RIGHT */}
      <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:w-1/2 lg:gap-6">

        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="font-semibold">📖 Read or Listen</h3>
          <p className="text-sm text-gray-500">
            Choose between reading eBooks or listening to audiobooks.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="font-semibold">🎥 Learn with Videos</h3>
          <p className="text-sm text-gray-500">
            Access high-quality video courses from experts.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="font-semibold">👨‍🏫 Learn from Experts</h3>
          <p className="text-sm text-gray-500">
            Courses by industry professionals.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="font-semibold">💰 Earn as Creator</h3>
          <p className="text-sm text-gray-500">
            Upload your books or courses and earn.
          </p>
        </div>

      </div>

    </div>
  );
};

export default Features;
