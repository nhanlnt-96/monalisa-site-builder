module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    textColor: {
      default: "#fff",
      black: "#281726",
      primary: "#bdff00",
      secondary: "#b22fff",
      danger: "#e3342f",
    },
    ringColor: {
      primary: "#bddd4e",
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      default: "#281726",
      primary: "#3490dc",
      secondary: "#151515",
      danger: "#e3342f",
    }),
    gradientColorStops: (theme) => ({
      ...theme("colors"),
      primary: "#3490dc",
      secondary: "#ffed4a",
      danger: "#e3342f",
    }),
  },
  variants: {
    extend: {
      ringColor: ["hover", "active"],
      ringWidth: ["hover", "active"],
    },
  },
  plugins: [],
};
