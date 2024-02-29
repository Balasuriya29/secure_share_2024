/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'sans':['Poppins',...defaultTheme.fontFamily.sans]
      },
      colors:{
        lightGray : "#F4F5F6",
        violet:"#E8EAFF",
      }
    },
  },
  plugins: [],
}

