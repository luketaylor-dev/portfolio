import type { Config } from "tailwindcss";

const primaryColors = {
  50: "#faf5ff",
  100: "#f3e8ff",
  200: "#e9d5ff",
  300: "#d8b4fe",
  400: "#c084fc",
  500: "#a855f7",
  600: "#9333ea",
  700: "#7e22ce",
  800: "#6b21a8",
  900: "#581c87",
  950: "#3b0764",
};

export default {
  content: ["./src/**/*.{ts,tsx,mdx}", "./content/**/*.{md,mdx}"],
  theme: {
    extend: {
      container: { center: true, padding: "1rem" },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "DM Sans", "system-ui", "sans-serif"],
        display: ["var(--font-dm-sans)", "DM Sans", "system-ui", "sans-serif"],
      },
      colors: {
        primary: primaryColors,
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
