/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        "board-chaser": '#ff0000',
        "board-contestant": '#00b3cd',
        "board-empty": '#00025b',
        "question-bg-start": "#1c4eb5",
        "question-bg-end": "#001750",
        "question-contestant-popout-start": "#66a4aa",
        "question-contestant-popout-end": "#2c757c",
        "question-chaser-popout-start": "#b50000",
        "question-chaser-popout-end": "#e8090c",
        "question-answer-popout-start": "#52667a",
        "question-answer-popout-end": "#11253a",
        "label-correct-answer-start": "#34eb58",
        "label-correct-answer-end": "#125711",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" }
        },
        fadeIn: {
          "0%": {opacity: 0},
          "100%": {opacity: 100}
        }
      },
      animation: {
        slideIn: "slideIn .25s ease-in-out forwards",
        fadeIn: "fadeIn .75s ease-in forwards"
      },
    },
  },
  plugins: [],
}

