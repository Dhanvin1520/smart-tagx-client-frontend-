/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // SmartTagX Design System
        primary: {
          50: '#e6f0ff',
          100: '#cfe0ff',
          200: '#9fc2ff',
          300: '#6fa3ff',
          400: '#3f85ff',
          500: '#156AF2',
          600: '#0056C9', // Primary brand blue
          700: '#0046A5',
          800: '#003682',
          900: '#00265f',
          DEFAULT: '#0056C9',
        },
        secondary: {
          50: '#f5f5f5',
          100: '#eaeaea',
          200: '#d5d5d5',
          300: '#b8b8b8',
          400: '#9a9a9a',
          500: '#7d7d7d',
          600: '#2C2C2C', // Dark gray for text/icons
          700: '#242424',
          800: '#1f1f1f',
          900: '#1a1a1a',
          DEFAULT: '#2C2C2C',
        },
        background: {
          DEFAULT: '#F5F5F5',
        },
        accent: {
          50: '#fef3c7',
          100: '#fde68a',
          200: '#fcd34d',
          300: '#fbbf24',
          400: '#f59e0b',
          500: '#d97706',
          600: '#b45309',
          700: '#92400e',
          800: '#78350f',
          900: '#451a03',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        }
      },
      borderRadius: {
        DEFAULT: '0.75rem', // rounded-xl feel across UI
      }
    }
  },
  plugins: [],
};
