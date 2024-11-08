import type { Config } from "tailwindcss"
import { withUt } from "uploadthing/tw";

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {

      scale: {
        '250': '2.5',
      },

      boxShadow: {
        largeInset: "inset 0 0 7px rgba(0, 0, 0, 0.3);",
        crustaInset: "inset 0 0 7px #F47458",
        largeInsetWhite: "inset 0 0 7px rgba(255, 255, 255, 0.3)"

      },


      backgroundImage: {
        'service-background': "url('/assets/service/background/bg5.png') ",
        'booking-background': 'linear-gradient(350deg, #f7d4d4 10%, #f6ecc4 60%, #FFFFFF 100%)',
        'booking-background-dark': 'linear-gradient(115deg, #0f447a 0%, #170e13 74%)',

      },

      fontWeight: {
        'lightly': "600"
      },

      transitionDuration: {
        '5000': '5000ms',
        '7000': '7000ms',
        '6000': '6000ms',

      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        crusta: "#F47458",
        lightgreen: "#6FBD44",

        lightcrusta: "#FFEDE1",
        torange: "#FA7436",
        hover_notification: "#eaeaea"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "scale-up": {
          '0%, 100%': {
            transform: 'scale(1)'
          },
          '50%': {
            transform: 'scale(2)'
          }
        },
        "animated-background": {
          '0%': {
            'background-position': '0% 50%'
          },
          '50%': {
            'background-position': '100% 50%'
          },
          '100%': {
            'background-position': '0% 50%'
          }

        },
        'fadeOut': {
          '0%': { 'opacity': '0' },
          '100%': { 'opacity': '1' },
        },
        'fadeIn': {
          '0%': { 'opacity': '1' },
          '100%': { 'opacity': '0' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "scale-up": "scale-up 10s linear infinite",
        "animated-background": "animated-background 10s linear infinite",
        'fade-out': 'fadeOut 1s forwards',
        'fade-in': 'fadeIn 1s forwards',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

