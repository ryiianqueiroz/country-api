/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        customFont: ['Nunito Sans', "sans-serif"],
      },
    },
    screens: {
      '2xl': {'max': '1535px'},

      'xl': {'max': '1300px'},

      'lg': {'max': '1100px'},

      'md': {'max': '768px'},

      'ta': {'max': '600px'},

      'sm': {'max': '420px'},

      'mob': {'max': '320px'},
    }
  },
  plugins: [],
}

