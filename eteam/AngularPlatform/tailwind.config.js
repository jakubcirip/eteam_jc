const colors = require("tailwindcss/colors");

module.exports = {
  prefix: "",
  purge: {
    content: ["./src/**/*.{html,ts}"]
  },
  darkMode: "class", // false or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: colors.orange
      }
    }
  },
  variants: {
    extend: {
      display: ["hover", "focus", "dark"],
      textColor: ["disabled"],
      backgroundColor: ["disabled"],
      cursor: ["disabled"]
    }
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography")
  ]
};
