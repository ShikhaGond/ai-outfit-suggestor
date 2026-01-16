/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neonBlue: "#00f2ff",
        electricViolet: "#7b00ff",
        glass: "rgba(255, 255, 255, 0.1)",
      },
      backdropBlur: {
        glass: "12px",
      },
    },
  },
  plugins: [],
};
