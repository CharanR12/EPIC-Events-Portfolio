/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
      },
      colors: {
        text: '#050316',
        background: '#fbfbfe',
        primary: '#f5eedb',
        secondary: '#f5eedb',
        accent: '#603941',
      },
      height: {
        navbar: '4rem',
      }
    },
  },
  plugins: [],
};