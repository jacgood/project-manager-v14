module.exports = {
  purge: {
    content: ['./pages/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}']
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    backgroundColor: ['responsive', 'hover', 'focus', 'group-hover']
  },
  theme: {
    extend: {
      fontFamily: {
        display: ['Raleway', 'sans-serif']
      }
    }
  },
  plugins: []
};
