/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-inter)',
      },
      colors: {
        black: {
          100: '#1C1C1C',
          80: 'rgba(28, 28, 28, 0.80)',
          40: 'rgba(28, 28, 28, 0.40)',
          20: 'rgba(28, 28, 28, 0.20)',
          10: 'rgba(28, 28, 28, 0.10)',
          5: 'rgba(28, 28, 28, 0.05)',
        },
        white: {
          100: '#FFF',
          80: 'rgba(255, 255, 255, 0.80)',
          40: 'rgba(255, 255, 255, 0.40)',
          20: 'rgba(255, 255, 255, 0.20)',
          10: 'rgba(255, 255, 255, 0.10)',
          5: 'rgba(255, 255, 255, 0.05)',
        },
        primary: {
          light: '#F7F9FB',
          blue: '#E3F5FF',
          purple: '#E5ECF6',
          'purple-50': 'rgba(229, 236, 246, 0.5)',
          brand: '#1C1C1C',
        },
        secondary: {
          purple: {
            A: '#95A4FC',
            B: '#C6C7F8',
          },
          blue: { A: '#A8C5DA', B: '#E3F5FF' },
          green: { A: '#A1E3CB', B: '#BAEDBD' },
          yellow: '#FFE999',
          red: '#FF4747',
        },
        layer: '#FFF',
      },
    },
  },
  plugins: [],
}
