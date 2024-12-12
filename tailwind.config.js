/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      background: "#000706",
      primary: "#033649",
      secondary: "#e8ddcb",
      neutral: "#dee7e7",
      "base-100": "base-100",
      success: "success",
    },
    backgroundImage: {
      gradient: "linear-gradient(to bottom left, #033649, #031634)",
    },
  },
  plugins: [],
};
