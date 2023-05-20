module.exports = {
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  darkMode: 'class',
  theme: {},
  plugins: [require("@tailwindcss/forms")],
  variants: {
    extend: {
      opacity: ['disabled'],
    }
  }
};

