// import type { Config } from 'tailwindcss'

// const config: Config = {
//   content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
//   theme: {
//     extend: {
//       fontFamily: {
//         display: ['var(--font-syne)', 'sans-serif'],
//         mono: ['var(--font-mono)', 'monospace'],
//         body: ['var(--font-inter)', 'sans-serif'],
//       },
//       keyframes: {
//         shimmer: {
//           '0%': { backgroundPosition: '200% center' },
//           '100%': { backgroundPosition: '-200% center' },
//         },
//         'scroll-left': {
//           '0%': { transform: 'translateX(0)' },
//           '100%': { transform: 'translateX(-50%)' },
//         },
//       },
//       animation: {
//         shimmer: 'shimmer 4s linear infinite',
//         'scroll-left': 'scroll-left 30s linear infinite',
//       },
//     },
//   },
// }
// export default config


import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: "#00C2FF",
      },
    },
  },
  plugins: [],
} satisfies Config;