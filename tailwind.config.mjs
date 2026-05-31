/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Maxon brand cyan, matching the VS Code extension icon.
        brand: {
          DEFAULT: '#00ADD8',
          50: '#e6f8fc',
          100: '#c0eef7',
          200: '#86dff0',
          300: '#42cde7',
          400: '#12bbdd',
          500: '#00ADD8',
          600: '#0089ad',
          700: '#006a87',
          800: '#004f66',
          900: '#003948',
        },
        ink: {
          950: '#070b10',
          900: '#0b1118',
          850: '#0e151e',
          800: '#121b26',
          700: '#1b2735',
          600: '#27374a',
        },
      },
      fontFamily: {
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'JetBrains Mono',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
};
