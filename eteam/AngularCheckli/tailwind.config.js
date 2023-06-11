const colors = require("tailwindcss/colors");

module.exports = {
  purge: {
    enabled: process.env.IS_PROD === "true" ? true : false,
    content: ["./src/**/*.html"],
  },

  darkMode: "media",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      gray: colors.trueGray,
      red: colors.red,
      blue: colors.lightBlue,
      yellow: colors.amber,
      white: colors.white,
      black: colors.black,
      gray: colors.gray,
      green: colors.green,
      orange: {
        50: "#f9f4e3",
        100: "#faeebb",
        200: "#f6e47c",
        300: "#f2d139",
        400: "#eab412",
        500: "#ffa805",
        600: "#d57004",
        700: "#b65408",
        800: "#96420f",
        900: "#7b3611",
      },
    },
    extend: {
      keyframes: {
        "reverse-bounce": {
          "0%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0,0,.58,1)",
          },
          "40%": {
            transform: "translateY(-15%)",
            animationTimingFunction: "cubic-bezier(.42,0,1,1)",
          },
          "60%": {
            transform: "translateY(0%)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
          "70%": {
            transform: "translateY(-5%)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
          "100%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
        },
      },
      animation: {
        "reverse-bounce": "reverse-bounce 0.8s ease-in infinite",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
