const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "https://brainleaf-backend.onrender.com";

export const apiUrl = (path) => `${BASE_URL}${path}`;