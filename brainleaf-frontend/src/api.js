const BASE_URL = "https://brainleaf-backend.onrender.com";

export const apiUrl = (path) => `${BASE_URL}${path}`;
export const fileUrl = (path) => `${BASE_URL}/${path}`;