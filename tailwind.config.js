/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          primary: '#2e4f7a',
          secondary: '#1d2a3d',
          accent: '#caa86a',
          ink: '#121522',
          muted: '#5c5f66',
        },
      },
      boxShadow: {
        panel: '0 10px 35px rgba(11, 18, 30, 0.08)',
      },
      animation: {
        rise: 'riseIn 550ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
      },
      keyframes: {
        riseIn: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
