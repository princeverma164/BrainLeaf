const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const apiUrl = (path) => `${BASE_URL}${path}`;
export const fileUrl = (path = "") => {
  const normalizedPath = path.replace(/\\/g, "/");
  return `${BASE_URL}/${normalizedPath}`.replace(/([^:]\/)\/+/g, "$1");
};
