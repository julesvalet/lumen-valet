/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        noir: "#0a0a0a",
        ink: "#111111",
        paper: "#f5f3ee",
        haze: "#9a9a93",
        acid: "#d6ff3f",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"],
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "marquee-reverse": "marquee-reverse 36s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};
