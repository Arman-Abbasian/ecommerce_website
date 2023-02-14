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
      },
      textShadow: {
        'primary': '2px 6px 3px #F6F4F2',
        '3xl': '0 0 3px rgba(0, 0, 0, .8), 0 0 5px rgba(0, 0, 0, .9)',
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    // require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar-hide'),
    require('tailwindcss-textshadow')

  ],
}
