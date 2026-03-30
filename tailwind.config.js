/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kambala-dark': '#121212',
        'kambala-gold': '#D4AF37',
      },
    },
  },
  plugins: [],
}