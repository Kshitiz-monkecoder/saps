/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
    gold: '#FFD700',
  },
       fontFamily: {
      gotham: ['"Gotham"', 'sans-serif'],
      cinzel: ["Cinzel", "serif"],
    montserrat: ["Montserrat", "sans-serif"],
    }
    },
  },
  plugins: [],
}
