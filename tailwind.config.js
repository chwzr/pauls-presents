module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "check-start": "hsl(192, 100%, 67%)",
        "check-end": "hsl(280, 87%, 65%)",
      },
      fontFamily: {
        body: ["Josefin Sans", "sans-serif"],
      },
      backgroundImage: {
        "mobile-light": "url('/bg.jpg')",
        "mobile-dark": "url('/bg.jpg')",
        "desktop-light": "url('/bg.jpg')",
        "desktop-dark": "url('/bg.jpg')",
      },
    },
  },
  variants: {
    extend: {
      outline: ["hover", "active", "checked"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
