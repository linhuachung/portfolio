/** @type {import('tailwindcss').Config} */
const { blackA, green, mauve, slate, violet } = require( "@radix-ui/colors" );

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "15px"
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px"
    },
    fontFamily: {
      primary: "var(--font-jetbrainsMono)"
    },
    extend: {
      colors: {
        ...blackA,
        ...green,
        ...mauve,
        ...slate,
        ...violet,
        primary: "#1c1c22",
        secondary: "#27272c",
        accent: {
          DEFAULT: "#00ff99",
          hover: "#00e187"
        }
      },
      keyframes: {
        hide: {
          from: { opacity: "1" },
          to: { opacity: "0" }
        },
        slideIn: {
          from: {
            transform: "translateX(calc(100% + var(--viewport-padding)))"
          },
          to: { transform: "translateX(0)" }
        },
        swipeOut: {
          from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
          to: { transform: "translateX(calc(100% + var(--viewport-padding)))" }
        }
      },
      animation: {
        hide: "hide 100ms ease-in",
        slideIn: "slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        swipeOut: "swipeOut 100ms ease-out"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      }
    }
  },
  plugins: [require( "tailwindcss-animate" )]
};
