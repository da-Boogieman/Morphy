/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4f46e5',
          dark: '#3730a3',
          light: '#818cf8'
        },
        love: {
          light: '#ff6b6b',
          DEFAULT: '#ff0066',
          dark: '#cc0052'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'love-pulse': 'love-pulse 2s infinite',
      },
      gridTemplateColumns: {
        '32': 'repeat(32, minmax(0, 1fr))',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate')
  ],
  safelist: [
    'bg-blue-500',
    'bg-purple-500',
    'bg-green-500',
    'hover:bg-blue-600',
    'hover:bg-purple-600',
    'hover:bg-green-600',
    'bg-primary',
    'hover:bg-primary-dark',
    'bg-primary-light',
    'bg-love',
    'hover:bg-love-dark',
    'bg-love-light'
  ]
}