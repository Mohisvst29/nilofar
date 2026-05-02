import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        blue: {
          50: '#e6f0fa',
          100: '#cce2f5',
          200: '#99c4ea',
          300: '#66a7e0',
          400: '#3389d5',
          500: '#0048A0',
          600: '#0048A0', // Matched to logo
          700: '#003a80',
          800: '#002b60',
          900: '#001d40',
        },
        green: {
          50: '#f2f9ec',
          100: '#e6f3d9',
          200: '#cce6b3',
          300: '#b3d98c',
          400: '#99cd66',
          500: '#7CC242', // Matched to logo
          600: '#7CC242',
          700: '#639b35',
          800: '#4a7428',
          900: '#19270d',
        }
      },
    },
  },
  plugins: [],
};
export default config;
