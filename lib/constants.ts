export const NAV_HEIGHT = 88;
export const SIDEBAR_WIDTH = 240;
console.log(process.env.NODE_ENV);
export const API_URL =
    process.env.NODE_ENV === "production"
        ? "https://recall-backend-5rw5.onrender.com"
        : "http://localhost:8000";
