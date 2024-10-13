import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#C8F748",
        secondary: "#EEEDEE",
        tertiary: "#333337",
        background: "#18171C",
        cellbackground: "#1C1B22",
        positive: "#C3D973",
        negative: "#F2766B",
        neutral: "#BBADFF",
      },
    },
  },
  plugins: [],
};
