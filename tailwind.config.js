/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        "board-chaser": '#ff0000',
        "board-contestant": '#00b3cd',
        "board-empty": '#00025b'
      },
    },
  },
  plugins: [],
}

