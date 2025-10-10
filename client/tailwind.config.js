/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        "primary-red": "#f70707",
      },
    },
  },
  daisyui: {
    themes: ["light", "dark"], // Light mode is default, and dark mode is toggled.
  },
};
