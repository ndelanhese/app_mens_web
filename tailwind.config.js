/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: 'var(--font-inter)',
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
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
      fontSize: {
        '2xl': ['3rem', '3.625rem'], // 48px
        xl: ['1.5rem', '2.25rem'], // 24px
        lg: ['1.125rem', '1.5rem'], // 18px
        md: ['0.875rem', '1.25rem'], // 14px
        sm: ['0.75rem', '1.125rem'], // 12px
      },
      fontWeight: {
        sb: '600',
        re: '400',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
