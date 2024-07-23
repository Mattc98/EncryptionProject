import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'dark-bg': '#1a202c', // Custom dark background color
        'dark-text': '#cbd5e0', // Custom dark text color
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'], // Custom font stack
      },
    },
  },
  plugins: [],
};

export default config;
