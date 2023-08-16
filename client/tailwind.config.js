/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {
      screens: {
        'xxxs': '320px',
        'xxs': '375px',
        'xs': '425px',
      },
      fontFamily : { 
        cursive: 'cursive',     
      },
    },
  },
  plugins: [],
}