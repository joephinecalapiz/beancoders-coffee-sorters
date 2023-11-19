/**
 * @format
 * @type {import('tailwindcss').Config}
 */

export default {
  darkMode: "class", // Enable dark mode
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      mobile: "400px",
      // => @media (min-width: 390px) { ... }

      tablet: "500px",
      // => @media (min-width: 500px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        brown: {
          800: "#512615", // Replace this with your desired brown color code
        },
        mainBrown: "#472214",
        secondBrown: "#7f1f19",
        lightBrown: "#512615"
      },
      textColor: {
        dark: "#ffffff", // Set the text color for dark mode
        textDesc: "#9aa0a6",
        textTitle: "#f3f3f4",
        primary: "#000000",
        secondary: "#ffffff"

      },
      backgroundColor: {
        dark: "#202124", // Set the background color for dark mode
        gray: "#292a2d",
        brown: "#3b2313",
        container: "#4d4f55",
        bgHover: "#353639",
        bgActive: "#4d4f55",
        mainbg: "#000000"
      },
      fontFamily: {
        display: "Poppins, sans-serif", // Adds a new `font-display` class
      },
    },
    backgroundImage: {
      CoffeeBeans: "url('./assets/background.png')",
      BgLanding: "url('./assets/bg_landing2.png')",
      bgopacity: "url('./assets/bgopacity.png')",
      bgLogin: "url('./assets/login_bg.png')",
      bgRegister: "url('./assets/reg_bg2.png')",
    },
  },

  //custom color theme/overwrite the default color of daisyUI
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#7F1F19",
          secondary: "#0094FF",
          accent: "#ffffff",
          neutral: "#3D4451",
          "base-100": "#FFFFFF",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
