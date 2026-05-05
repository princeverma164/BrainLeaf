export const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "https://brainleaf-backend.onrender.com");

export const apiUrl = (path) => `${API_BASE}${path}`;

export const fileUrl = (path = "") => {
  const normalizedPath = path.replace(/\\/g, "/");
  return `${API_BASE}/${normalizedPath}`.replace(/([^:]\/)\/+/g, "$1");
};
