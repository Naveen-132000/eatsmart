/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          500: '#2ECC71',
          600: '#27AE60',
          400: '#58D68D',
        },
        orange: {
          500: '#FF6B35',
          600: '#E85A30',
          400: '#FF8C5A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
};