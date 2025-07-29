// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // asegurate de tener esto
  ],
  theme: {
  extend: {
    fontFamily: {
      sans: ['Nunito', 'sans-serif'], // esto reemplaza font-sans por Nunito
    },
  },
}
,
  plugins: [],
}
