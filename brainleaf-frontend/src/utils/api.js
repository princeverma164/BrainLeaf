const envApiBase = import.meta.env.VITE_API_BASE_URL;
const PROD_API_BASE = "https://brainleaf-backend01.onrender.com";
const cleanBaseUrl = (value) => {
  const trimmed = value?.trim();

  if (!trimmed || trimmed === "/" || /\.vercel\.app\/?$/i.test(trimmed)) {
    return "";
  }

  return trimmed.replace(/\/+$/, "");
};
const configuredApiBase = cleanBaseUrl(envApiBase);

export const API_BASE =
  import.meta.env.MODE === "development"
    ? configuredApiBase || "http://localhost:5000"
    : configuredApiBase || PROD_API_BASE;

export const apiUrl = (path) => `${API_BASE}${path}`;

export const fileUrl = (path = "") => {
  const normalizedPath = path.replace(/\\/g, "/");

  if (/^(https?:|data:|blob:)/i.test(normalizedPath)) {
    return normalizedPath;
  }

  return `${API_BASE}/${normalizedPath}`.replace(/([^:]\/)\/+/g, "$1");
};

if (typeof window !== "undefined") {
  window.apiUrl = apiUrl;
}
