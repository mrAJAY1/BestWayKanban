/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#ceccd1",
          200: "#9c99a4",
          300: "#6b6676",
          400: "#393349",
          500: "#08001b",
          600: "#060016",
          700: "#050010",
          800: "#03000b",
          900: "#020005",
        },
        secondary: {
          100: "#e1dbeb",
          200: "#c3b6d7",
          300: "#a592c2",
          400: "#876dae",
          500: "#69499a",
          600: "#543a7b",
          700: "#3f2c5c",
          800: "#2a1d3e",
          900: "#150f1f",
        },
      },
    },
    fontFamily: {
      sans: ["Rubik", "sans-serif"],
    },
  },
  plugins: [],
};
