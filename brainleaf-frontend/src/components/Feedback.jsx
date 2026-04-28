import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl, fileUrl } from "../utils/api";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState({
    name: "",
    message: "",
    photo: null,
  });

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(apiUrl("/api/feedback")); // ✅ correct
      setFeedbacks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setForm({ ...form, photo: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.message.trim()) {
      alert("Name and feedback required");
      return;
    }

    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("message", form.message);
      if (form.photo) data.append("photo", form.photo);

      await axios.post(apiUrl("/api/feedback"), data); // ✅ correct

      alert("Feedback added!");

      setForm({ name: "", message: "", photo: null });
      fetchFeedbacks();
    } catch (err) {
      console.log(err);
      alert("Failed");
    }
  };

  return (
    <div className="px-12 py-16 bg-gray-50">

      <h2 className="text-3xl font-bold text-center mb-8">
        What Users Say
      </h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 mb-10">

        <input
          name="name"
          value={form.name}
          placeholder="Your Name"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="message"
          value={form.message}
          placeholder="Your Feedback"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input type="file" name="photo" onChange={handleChange} />

        <button className="w-full bg-green-600 text-white py-2 rounded">
          Submit
        </button>

      </form>

      {/* LIST */}
      <div className="grid grid-cols-3 gap-6">
        {feedbacks.map((f) => (
          <div key={f._id} className="bg-white p-4 rounded shadow">

            {f.photo && (
              <img
                src={fileUrl(f.photo)}
                className="w-12 h-12 rounded-full mb-2"
              />
            )}

            <h3 className="font-semibold">{f.name}</h3>
            <p className="text-gray-600 text-sm">{f.message}</p>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Feedback;