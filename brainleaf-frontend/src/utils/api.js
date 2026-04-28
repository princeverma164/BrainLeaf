export const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

export const apiUrl = (path) => `${API_BASE}${path}`;

export const fileUrl = (path = "") => {
  const normalizedPath = path.replace(/\\/g, "/");
  return `${API_BASE}/${normalizedPath}`.replace(/([^:]\/)\/+/g, "$1");
};
