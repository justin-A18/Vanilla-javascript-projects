/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./index.html"
  ],
  theme: {
    extend: {
      borderRadius:{
        "carrito-r": "1rem 0 1rem 1rem"
      }
    },
  },
  plugins: [],
}

