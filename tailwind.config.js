/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#0F172A',
        secondary: '#334155',
        accent: '#38BDF8',
        success: '#22C55E',
        warning: '#F59E0B',
        background: '#F8FAFC',
        'card-bg': '#FFFFFF',
        border: '#E2E8F0',
        'text-primary': '#020617',
        'text-muted': '#64748B',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      animation: {
        'fade-in': 'fadeIn 280ms ease-out forwards',
        'slide-up': 'slideUp 280ms ease-out forwards',
        'scale-in': 'scaleIn 220ms ease-out forwards',
        'pulse-slow': 'pulse 1.5s ease-in-out infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'soft': '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 4px 16px -4px rgba(0, 0, 0, 0.05)',
        'lift': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}