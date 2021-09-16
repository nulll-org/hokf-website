const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: {
    content: ['./src/**/**/*.{html,scss,vue}', './src/**/**/**/*.{html,scss,vue}', './src/*.vue']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter'],
        'mulish': ['Mulish', 'sans']
      },
      width: {
        '18%': '18%',
        '82%': '82%',
        '22%': '22%',
        '23%': '23%',
        '30%': '30%',
        '48%': '48%'
      },
      height: {
        '90vh': '90vh',
        '80vh': '80vh',
        '70vh': '70vh',
        '60vh': '60vh',
        '50vh': '50vh',
        '40vh': '40vh',
        '10vh': '10vh',
        '90%': '90%',
        '80%': '80%',
        '70%': '70%',
        '60%': '60%',
        '50%': '50%',
        '40%': '40%',
      },
      minHeight: {
        '90vh': '90vh',
        '80vh': '80vh',
        '70vh': '70vh',
        '60vh': '60vh',
        '50vh': '50vh',
        '40vh': '40vh',
        '90%': '90%',
        '80%': '80%',
        '70%': '70%',
        '60%': '60%',
        '50%': '50%',
        '40%': '40%',
      },
      maxHeight: {
        '90vh': '90vh',
        '80vh': '80vh',
        '70vh': '70vh',
        '60vh': '60vh',
        '50vh': '50vh',
        '40vh': '40vh',
        '90%': '90%',
        '80%': '80%',
        '70%': '70%',
        '60%': '60%',
        '50%': '50%',
        '40%': '40%',
      },
      inset: {
        '50%': '50%',
        '60%': '60%'
      },
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    plugin(function ({ addBase, theme }) {
      addBase({
        'p': { fontFamily: theme('fontFamily.inter') },
        'h1': { fontFamily: theme('fontFamily.inter'), fontWeight: theme('fontWeight.extraBold'), fontSize: theme('fontSize.4xl') },
        'h2': { fontFamily: theme('fontFamily.inter'), fontWeight: theme('fontWeight.bold'), fontSize: theme('fontSize.3xl') },
        'h3': { fontFamily: theme('fontFamily.inter'), fontWeight: theme('fontWeight.bold'), fontSize: theme('fontSize.2xl') },
      })
    }),

  ],
}
