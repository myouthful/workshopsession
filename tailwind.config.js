/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
            opensans:['Open Sans', 'sans-serif ']
        },
        colors: {
            darkgreen: "#152F00",
            mustardyellow:"#E0AE24",
            brown: "#5D4E2C",
            lightgreen:"#A1E96F"
        },
        backgroundImage: {
          'heropattern': "url('/src/assets/bg.svg')",
        },
      },
    },
    plugins: [],
  }