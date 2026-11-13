import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#002060",
          dark: "#020B2D",
          cyan: "#00B4D8",
          light: "#90E0EF",
        },
      },
    },
  },
  plugins: [],
};

export default config;
