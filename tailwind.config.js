/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['nunito']
    },
		extend: {
			fontFamily: {
				nunito: ["nunito"],
			},
		},
  },
  plugins: [],
}

