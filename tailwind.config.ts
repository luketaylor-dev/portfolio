import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/**/*.{ts,tsx,mdx}',
    './content/**/*.{md,mdx}'
  ],
  theme: {
    extend: {
      container: { center: true, padding: '1rem' }
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config
