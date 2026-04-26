/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    { pattern: /bg-(blue|green|red|yellow|purple|pink|orange|teal|indigo|gray|emerald|violet|rose|amber|cyan|lime|sky|slate)-(100|200|500|600|700)/ },
    { pattern: /text-(blue|green|red|yellow|purple|pink|orange|teal|indigo|gray|emerald|violet|rose|amber|cyan|lime|sky|slate)-(600|700|800)/ },
    { pattern: /border-(blue|green|red|yellow|purple|pink|orange|teal|indigo|gray|emerald|violet|rose|amber|cyan|lime|sky|slate)-(200|300|400)/ },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
