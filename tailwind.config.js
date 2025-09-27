export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'dancing-script': ['"Dancing Script"', 'cursive'],
        'great-vibes': ['"Great Vibes"', 'cursive'],
        'parisienne': ['"Parisienne"', 'cursive'],
      },
      backgroundImage: {
        'radial-gradient': "radial-gradient(ellipse at center, rgba(255, 105, 180, 0.15) 0%, rgba(0, 0, 0, 0) 70%)",
      }
    },
  },
  plugins: [],
}
