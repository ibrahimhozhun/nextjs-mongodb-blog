module.exports = {
  mode: "jit",
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: "media",
  theme: {
    extend: {
      screens: {
        "xs": "400px",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
