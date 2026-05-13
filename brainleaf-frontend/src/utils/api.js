const envApiBase = import.meta.env.VITE_API_BASE_URL;

export const API_BASE =
  import.meta.env.MODE === "development"
    ? envApiBase || "http://localhost:5000"
    : envApiBase || "";

export const apiUrl = (path) => `${API_BASE}${path}`;

export const fileUrl = (path = "") => {
  const normalizedPath = path.replace(/\\/g, "/");
  return `${API_BASE}/${normalizedPath}`.replace(/([^:]\/)\/+/g, "$1");
};

if (typeof window !== "undefined") {
  window.apiUrl = apiUrl;
}
