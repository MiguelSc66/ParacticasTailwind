/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': {'max': '450px'},
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.no-spin': {
          '-moz-appearance': 'textfield',
          '-webkit-appearance': 'none',
          '&::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            'margin': '0',
          },
          '&::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            'margin': '0',
          },
        },
      };

      addUtilities(newUtilities);
    },
  ],
}


