import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl, fileUrl } from "../utils/api";

const FeedbackSection = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState({
    name: "",
    message: "",
    photo: null,
  });

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(apiUrl("/api/feedbacks"));
      setFeedbacks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setForm({ ...form, photo: e.target.files[0] });
      return;
    }

    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.message.trim()) {
      alert("Name and feedback are required");
      return;
    }

    try {
      const data = new FormData();
      data.append("name", form.name.trim());
      data.append("message", form.message.trim());
      if (form.photo) data.append("photo", form.photo);

      await axios.post(apiUrl("/api/feedbacks"), data);

      alert("Feedback added successfully!");
      setForm({ name: "", message: "", photo: null });
      e.target.reset();
      fetchFeedbacks();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Feedback failed");
    }
  };

  return (
    <section className="w-full bg-gray-50 px-4 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-10">
          <p className="text-green-600 text-sm font-medium">Community Feedback</p>
          <h2 className="text-3xl font-bold text-gray-900">
            What readers say about Brainleaf
          </h2>
          <p className="text-gray-500 mt-2">
            Share your experience without logging in.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[380px_1fr]">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-sm space-y-4"
          >
            <input
              type="text"
              name="name"
              value={form.name}
              placeholder="Your name"
              onChange={handleChange}
              className="w-full border p-2 rounded-md outline-none"
            />

            <textarea
              name="message"
              value={form.message}
              placeholder="Write your feedback..."
              onChange={handleChange}
              rows="5"
              className="w-full border p-2 rounded-md outline-none resize-none"
            />

            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-sm"
            />

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
            >
              Add Feedback
            </button>
          </form>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {feedbacks.length === 0 ? (
              <div className="bg-white p-6 rounded-xl shadow-sm text-gray-500">
                No feedback yet.
              </div>
            ) : (
              feedbacks.map((feedback) => {
                const displayName = feedback.name || "Brainleaf User";
                const photo = feedback.photo || feedback.image;

                return (
                  <div
                    key={feedback._id}
                    className="bg-white p-5 rounded-xl shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {photo ? (
                        <img
                          src={fileUrl(photo)}
                          alt={displayName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">
                          {displayName.charAt(0).toUpperCase()}
                        </div>
                      )}

                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {displayName}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {new Date(feedback.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-600">{feedback.message}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
