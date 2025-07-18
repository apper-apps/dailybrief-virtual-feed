/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        primary: '#1A1A1A',
        secondary: '#FF4757',
        accent: '#3742FA',
        surface: '#FFFFFF',
        background: '#F8F9FA',
        success: '#2ED573',
        warning: '#FFA502',
        error: '#FF4757',
        info: '#3742FA',
      },
      animation: {
        'pulse-breaking': 'pulse 1.5s ease-in-out infinite',
        'scale-hover': 'scale 0.15s ease-out',
      },
      boxShadow: {
        'card': '0 4px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 8px 16px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}