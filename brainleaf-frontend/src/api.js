const BASE_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
    : import.meta.env.VITE_API_BASE_URL || "";

export const apiUrl = (path) => `${BASE_URL}${path}`;
export const fileUrl = (path = "") => {
  const normalizedPath = path.replace(/\\/g, "/");

  if (/^(https?:|data:|blob:)/i.test(normalizedPath)) {
    return normalizedPath;
  }

  return `${BASE_URL}/${normalizedPath}`.replace(/([^:]\/)\/+/g, "$1");
};
