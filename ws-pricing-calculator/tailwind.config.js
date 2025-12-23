module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e0f6f7',
          100: '#b3e6ea',
          200: '#80d6dd',
          300: '#4dc6d0',
          400: '#26b8c5',
          500: '#009ca6',
          600: '#00798a', // matches Calculate Travel button (teal/dark cyan)
          700: '#005e6b',
          800: '#00434c',
          900: '#00282d',
        },
        secondary: {
          50: '#e0f6f7',
          100: '#b3e6ea',
          200: '#80d6dd',
          300: '#4dc6d0',
          400: '#26b8c5',
          500: '#00b0bb',
          600: '#00a3ad', // matches Apply to Additional Costs button (cyan/teal)
          700: '#008b95',
          800: '#00737d',
          900: '#005b65',
        },
      },
    },
  },
  plugins: [],
};
