/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        border: '#e5e7eb', // default light gray
      },
    },
  },
  plugins: [],
};
