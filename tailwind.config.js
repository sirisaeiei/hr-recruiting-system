/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Sarabun"', '"Noto Sans Thai"', 'sans-serif'],
      },
      colors: {
        green: {
          50: '#EAF5EC',
          100: '#E8F5E9',
          200: '#C8E6C9',
          300: '#A5D6A7',
          700: '#008F18',
          800: '#08652D',
        },
        slate: {
          50: '#FAFAFA',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#6B7280',
          700: '#374151',
          800: '#171717',
          900: '#171717',
        },
      },
    },
  },
  plugins: [],
}
