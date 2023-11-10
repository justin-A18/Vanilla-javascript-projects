/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./index.html"
  ],
  theme: {
    extend: {
      backgroundColor: {
        "fondo": "#EAEEF2",
        "card": "#48A8E1",
        "btn": "#2685C3",
      },
      colors: {
        "icons": "#B0E0F1",
      }
    },
  },
  plugins: [],
}

