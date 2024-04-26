/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx.html}",
    "./public/index.html"
  ],
  theme: {
 
    fontFamily: {
      main: ["Poppins", 'sans-serif']
    },
    extend: {
      width: {
        main: '1220px'

      },
      backgroundColor: {
        main: '#ee3131'
      },
      colors: {
        main: '#ee3131'
      },
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%',
        '4': '4 4 0%',
        '5': '5 5 0%',
        '6': '6 6 0%',
        '7': '7 7 0%',
        '8': '8 8 0%',
        '9': '9 9 0%',
      }
      
    },
  },
  plugins: [
    "@tailwindcss/line-clamp"
  ],
}