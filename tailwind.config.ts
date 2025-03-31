import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          cream: "#FFFAEF",
          pink: "#FF819D",
          softpink: "#FFF4F6",
          red: "#A53E55",
          50: "#FFF8E9",
          100: "#FFF4F6",
          200: "#FFD2D2",
          300: "#FF6D8D",
          400: "#BF5C72",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
