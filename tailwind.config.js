/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary_cream:"#C6AD8F",
        primary_dark_blue:"#425664",
        primary_light_gray:"#F6F4F2",
      }
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    // require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar-hide')

  ],
}
