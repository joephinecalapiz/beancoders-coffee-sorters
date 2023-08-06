/**
 * @format
 * @type {import('tailwindcss').Config}
 */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brown: {
          800: "#512615", // Replace this with your desired brown color code
        },
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
