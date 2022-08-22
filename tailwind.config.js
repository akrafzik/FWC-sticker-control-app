const defaultTheme = require("tailwindcss/defaultConfig");

module.exports = {
  mode: "jit",
  // content: [
  //   "./pages/*.{js,ts,jsx,tsx}",
  //   "./pages/**/*.{js,ts,jsx,tsx}",
  //   "./components/*.{js,ts,jsx,tsx}",
  // ],
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  // important: true,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#3B81F6",
        white: "#ffffff",
        warning: "#ff0000",
        black: "#000000",
        dark:{
          red: "#6f0f27",
          gray: "#dedede"
        },
        text: {
          DEFAULT: "#1F2937",
          light: "#6C7281",
        },
        light: {
          DEFAULT: "#FAFBFC",
          lighter: "#F3F4F6",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
