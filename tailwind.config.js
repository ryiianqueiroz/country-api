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
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1300px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1100px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '768px'},
      // => @media (max-width: 768px) { ... }

      'sm': {'max': '320px'},
      // => @media (max-width: 639px) { ... }
    }
  },
  plugins: [],
}

