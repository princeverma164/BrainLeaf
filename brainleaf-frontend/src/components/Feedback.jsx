import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl, fileUrl } from "../utils/api";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(apiUrl("/api/feedback"));
      setFeedbacks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log(err);
      setFeedbacks([]);
    }
  };

  return (
    <div className="px-12 py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">
        What Users Say
      </h2>

      <div className="grid grid-cols-3 gap-6">
        {feedbacks.map((f) => (
          <div key={f._id} className="bg-white p-4 rounded shadow">
            {f.photo && (
              <img
                src={fileUrl(f.photo)}
                className="w-12 h-12 rounded-full mb-2"
              />
            )}
            <h3>{f.name}</h3>
            <p>{f.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;