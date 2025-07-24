module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
        "jetbrains-mono": ["JetBrains Mono", "monospace"],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(-4%)' },
          '50%': { transform: 'translateY(0)' },
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
      colors: {
        black: "#000000",
        white: "#FFFFFF",
        gray: {
          400: "#7A7A7A"
        },
        blue: {
          400: "#0099FF"
        }
      },
    },
    // Optionally adjust screens for Framer breakpoints
    screens: {
      xl: "1440px",
      lg: "1200px",
      md: "810px",
      sm: "390px",
      xs: "0px"
    }
  },
  plugins: [],
};
