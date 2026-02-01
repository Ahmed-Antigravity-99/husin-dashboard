/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        husin: {
          blue: "#2563eb",
          dark: "#1e40af",
        }
      }
    },
  },
  plugins: [],
};
