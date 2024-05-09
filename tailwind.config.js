/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",

  ],
  theme: {
    extend: {},
    animation: {
      fade: 'fadeOut 2s ease-in-out'
    },
    keyframes: {
      fadeOut: {
        '0%': { opacity: 1 },
        '100%': { opacity: 0 }
      }
    },
    screens: {
			'xxxs': '320px',
			'xxs': '390px',
			'xs': '475px',
		}
  },
  plugins: [],
}

