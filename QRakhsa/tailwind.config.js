/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        emergency: {
          red: '#D32F2F',
          green: '#43A047',
          blue: '#1976D2'
        }
      }
    },
  },
  plugins: [],
  darkMode: 'media'
};