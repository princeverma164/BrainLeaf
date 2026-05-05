import React, { useState } from "react";
import axios from "axios";
import { apiUrl } from "../utils/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        apiUrl("/api/auth/login"),
        {
          email: form.email,
          password: form.password,
        }
      );

      localStorage.setItem("token", res.data.token);
      window.dispatchEvent(new Event("storage"));
      alert("Login successful");
      navigate("/");
    } catch (err) {
      console.log(err.response?.data);

      alert(
        err.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-2"
        />

        <button className="bg-green-600 text-white px-4 py-2">
          Login
        </button>

      </form>
    </div>
  );
};

export default Login;