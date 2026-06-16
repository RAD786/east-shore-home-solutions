import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Premium coastal handyman palette ──────────────────
        // navy    = deep charcoal-navy base (headers, footer, text)
        // seafoam = muted coastal blue accent (links, icons, trust)
        // sand    = clean off-white backgrounds
        // accent  = warm gold / sand accent for primary CTAs
        navy: {
          DEFAULT: "#0f2a3f",
          50: "#eef3f7",
          100: "#d6e2ec",
          500: "#1c4d6e",
          600: "#16415f",
          700: "#0f2a3f",
          800: "#0a1f2f",
          900: "#06141f",
        },
        // Muted coastal blue (desaturated, not teal/green)
        seafoam: {
          DEFAULT: "#357a9e",
          50: "#eef4f8",
          100: "#d4e4ef",
          200: "#a9c7da",
          500: "#357a9e",
          600: "#2c6584",
          700: "#234e66",
        },
        // Clean white / off-white
        sand: {
          DEFAULT: "#f5f1ea",
          100: "#faf8f3",
          200: "#f5f1ea",
          300: "#e9e1d3",
        },
        // Warm gold / sand accent — primary CTA color
        accent: {
          DEFAULT: "#c89537",
          400: "#d9ab50",
          500: "#c89537",
          600: "#a9792b",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 24px -8px rgba(15, 42, 63, 0.18)",
        cardHover: "0 12px 36px -10px rgba(15, 42, 63, 0.28)",
      },
      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
