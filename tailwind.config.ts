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
        primary: "#1a0033",
        accent: "#04d1a1",
        third: "#84fadf",
        fourth: "#f2f7ff",
      },
    },
  },
  plugins: [],
} satisfies Config;
