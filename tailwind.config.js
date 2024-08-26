const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        ...defaultTheme.screens,
      },
      fontFamily: {
        sans: ['FiraCode', 'Roboto', 'sans-serif'],  // Custom font stack
      },
      colors: {
        bodyBackgroud: '#f8f8f8',
        bodyBackgroundDark: '#000'
      },
      backgroundImage: {
        'homeBackground': "url(/weather_background.webp)"
      },
      width: {
        w10: '10%',
        w20: '20%',
        w30: '30%',
        w40: '40%',
        w50: '50%',
        w60: '60%',
        w70: '70%',
        w80: '80%',
        w90: '90%',
      },
      height: {
        h10: '10%',
        h20: '20%',
        h30: '30%',
        h40: '40%',
        h50: '50%',
        h60: '60%',
        h70: '70%',
        h80: '80%',
        h90: '90%',
      }
    },
  },
  plugins: [],
}

