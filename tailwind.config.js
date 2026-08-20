export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        corporate: {
          navy: '#0F172A',
          charcoal: '#1E293B',
          red: '#DC2626',
          white: '#FFFFFF',
          lightgray: '#F9FAFB',
          slate: '#475569'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
