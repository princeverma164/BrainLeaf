import React, { useState } from "react";
import axios from "axios";
import { apiUrl } from "../utils/api";

const UploadBook = () => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    category: "",
    file: null,
    coverImage: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "file" || e.target.name === "coverImage") {
      setForm({ ...form, [e.target.name]: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login before uploading");
        return;
      }

      if (!form.title || !form.price || !form.file || !form.category) {
        alert("All fields are required");
        return;
      }

      const data = new FormData();
      data.append("title", form.title);
      data.append("author", form.author);
      data.append("description", form.description);
      data.append("price", form.price);
      data.append("category", form.category);
      data.append("file", form.file);
      if (form.coverImage) {
        data.append("coverImage", form.coverImage);
      }

      await axios.post(apiUrl("/api/books"), data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Book uploaded successfully!");

      setForm({
        title: "",
        author: "",
        description: "",
        price: "",
        category: "",
        file: null,
        coverImage: null,
      });

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-[460px] space-y-4 sm:p-8"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold">Seller Book Upload</h2>
          <p className="text-sm text-gray-500 mt-1">Add book details, PDF file, and front cover.</p>
        </div>

        <input name="title" value={form.title} placeholder="Title" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="author" value={form.author} placeholder="Author" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="description" value={form.description} placeholder="Description" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="price" value={form.price} placeholder="Price" onChange={handleChange} className="w-full border p-2 rounded" />

        <select name="category" value={form.category} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="">Select Category</option>
          <option value="Business">Business</option>
          <option value="Self Help">Self Help</option>
          <option value="Tech">Tech</option>
        </select>

        <label className="block text-sm font-medium text-gray-700">
          Book PDF
          <input type="file" name="file" accept="application/pdf" onChange={handleChange} className="mt-1 w-full" />
        </label>

        <label className="block text-sm font-medium text-gray-700">
          Front Cover Image
          <input type="file" name="coverImage" accept="image/*" onChange={handleChange} className="mt-1 w-full" />
        </label>

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadBook;
