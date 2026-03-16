import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ocean:  { DEFAULT: '#065A82', light: '#0A7AAD', dark: '#044060' },
        teal:   { DEFAULT: '#00A896', light: '#00C4B0', dark: '#008A7A' },
        mint:   { DEFAULT: '#02C39A' },
        dolphi: { DEFAULT: '#0D2B3E', mid: '#1C3A4A', light: '#F0F9FC' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
