/** @type {import('tailwindcss').Config} */
module.exports = {
  // Remove 'jit' since it's always on in Tailwind CSS v3.0
  content: ["./src/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: '#FFD700',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
