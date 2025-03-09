/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--primary-color))',
          light: 'rgb(var(--primary-color) / 0.8)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--secondary-color))',
          light: 'rgb(var(--secondary-color) / 0.8)',
        },
        tertiary: {
          DEFAULT: 'rgb(var(--tertiary-color))',
          light: 'rgb(var(--tertiary-color) / 0.8)',
        },
      },
    },
  },
  plugins: [],
} 