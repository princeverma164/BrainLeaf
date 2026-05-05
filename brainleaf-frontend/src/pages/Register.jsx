import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../utils/api";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const name = form.name.trim();
      const email = form.email.trim().toLowerCase();
      const password = form.password.trim();

      if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
      }

      const res = await axios.post(
        apiUrl("/api/auth/register"),
        {
          name,
          email,
          password,
        }
      );

      if (res.data?.success === false) {
        alert(res.data?.message || "Registration failed");
        return;
      }

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        window.dispatchEvent(new Event("storage"));
        alert(res.data.message || "Registered successfully!");
        navigate("/");
        return;
      }

      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-8">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-[350px] space-y-4 sm:p-8"
      >

        <h2 className="text-2xl font-bold text-center">Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Register
        </button>

      </form>

    </div>
  );
};

export default Register;
