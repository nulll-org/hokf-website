const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: {
    content: ['./src/**/**/*.{html,scss}', './src/*.vue']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter']
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
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
