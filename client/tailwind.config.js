/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./chat.html",
    "./agency.html"
  ],
  theme: {
    extend: {
      colors: {
        tourism: {
          primary: '#2563eb', // Blue-600
          'primary-dark': '#1d4ed8', // Blue-700
          secondary: '#7c3aed', // Violet-600
          'secondary-dark': '#6d28d9', // Violet-700
          accent: '#059669', // Emerald-600
          'accent-dark': '#047857', // Emerald-700
          success: '#10b981', // Emerald-500
          warning: '#f59e0b', // Amber-500
          error: '#ef4444', // Red-500
          ocean: '#2563eb',
          sunset: '#7c3aed',
          gold: '#f59e0b'
        }
      },
      backgroundImage: {
        'gradient-tourism': 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #7c3aed 0%, #f59e0b 100%)',
        'hero-pattern': 'linear-gradient(135deg, rgba(37, 99, 235, 0.9) 0%, rgba(124, 58, 237, 0.9) 100%)'
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'slide-in': 'slideIn 0.8s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'bounce-slow': 'bounce 3s infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}