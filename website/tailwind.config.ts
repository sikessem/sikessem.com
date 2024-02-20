import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import styliz from "styliz";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./res/**/*"],

  theme: {
    extend: {
      fontFamily: {
        sans: [...defaultTheme.fontFamily.sans],
      },
    },
  },

  plugins: [forms, typography, styliz],
};
