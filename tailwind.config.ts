import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#fef8f4",
        "on-background": "#1d1b19",
        surface: "#fef8f4",
        "surface-bright": "#fef8f4",
        "surface-dim": "#dfd9d5",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f8f2ee",
        "surface-container": "#f3ede9",
        "surface-container-high": "#ede7e3",
        "surface-container-highest": "#e7e1dd",
        "surface-variant": "#e7e1dd",
        "on-surface": "#1d1b19",
        "on-surface-variant": "#40474f",
        "inverse-surface": "#32302e",
        "inverse-on-surface": "#f6f0ec",
        outline: "#707881",
        "outline-variant": "#c0c7d1",
        primary: {
          DEFAULT: "#00507d",
          hover: "#0284c7",
          container: "#0369a1",
        },
        "on-primary": "#ffffff",
        "on-primary-container": "#cbe4ff",
        secondary: {
          DEFAULT: "#6e5a52",
          espresso: "#2D1E18",
          container: "#f5dad0",
        },
        "on-secondary": "#ffffff",
        "on-secondary-container": "#735e56",
        tertiary: {
          DEFAULT: "#634706",
          gold: "#c5a059",
          container: "#7e5f1f",
        },
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#ffdda1",
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        sm: "0.125rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
      },
      spacing: {
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2.5rem",
        gutter: "1.5rem",
        "gutter-desktop": "2.5rem",
        margin: "1.25rem",
        "margin-tablet": "2.5rem",
        "margin-desktop": "4rem",
      },
      boxShadow: {
        warm: "0 4px 20px -2px rgba(45, 30, 24, 0.07), 0 1px 3px 0 rgba(45, 30, 24, 0.04)",
        "warm-lg": "0 16px 32px -4px rgba(45, 30, 24, 0.12), 0 4px 8px -2px rgba(45, 30, 24, 0.06)",
        primary: "0 4px 14px 0 rgba(0, 80, 125, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;

