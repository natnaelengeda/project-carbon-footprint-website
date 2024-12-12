/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Urbanist: ["Urbanist", "sans-serif"],
      },
      colors: {
        primary: "#35D36A",
      },
    },
  },
  plugins: [],
}
