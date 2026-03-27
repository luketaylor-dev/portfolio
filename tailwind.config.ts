import type { Config } from "tailwindcss";

const primaryColors = {
  50: "#fff7ed",
  100: "#ffedd5",
  200: "#fed7aa",
  300: "#fdba74",
  400: "#fb923c",
  500: "#f97316",
  600: "#ea580c",
  700: "#c2410c",
  800: "#9a3412",
  900: "#7c2d12",
  950: "#431407",
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
