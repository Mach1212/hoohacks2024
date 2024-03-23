/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  important: '#root',
  theme: {
    colors: {
      primary: '#757575',
      accent: '#ffcd29',
      text: '#233128',
      background: '#e6e6e6',
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
