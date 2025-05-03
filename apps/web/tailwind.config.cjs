/** @type {import('tailwindcss').Config} */
// const config = require("@repo/tailwind-config/tailwindConfig");
const config = require("../../packages/tailwind-config/tailwind.config")

module.exports = {
  ...config,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/**/*.{js,jsx,ts,tsx}", // For your UI library (shared components)
  ]
};