module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      primary: "#f0f0f0",
      secondary: "#ff9a47",
    }),
    textColor: {
      primary: "#f0f0f0",
      secondary: "#ff9a47",
    },
    borderColor: (theme) => ({
      primary: "#f0f0f0",
      secondary: "#ff9a47",
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
