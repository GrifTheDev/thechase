<script lang="ts">
  import { doc, onSnapshot } from "@firebase/firestore";
  import { getDB } from "$lib/firebase";
  import { PUBLIC_GAMEID } from "$env/static/public";

  let gameState = -2;
  let questionState = -1;
  let answerA = "";
  let answerB = "";
  let answerC = "";
  let correctAnswer = "";
  let difficulty = -1;
  let question = "";
  let contestantAnswer = false;
  let chaserAnswer = false;

  const { db } = getDB();

  onSnapshot(doc(db, "gameIDs", PUBLIC_GAMEID), (doc1) => {
    gameState = doc1.data()!.gameState;
    questionState = doc1.data()!.questionState;
    answerA = doc1.data()!.currentQuestion.answerA;
    answerB = doc1.data()!.currentQuestion.answerB;
    answerC = doc1.data()!.currentQuestion.answerC;
    correctAnswer = doc1.data()!.currentQuestion.correctAnswer;
    difficulty = doc1.data()!.currentQuestion.difficulty;
    question = doc1.data()!.currentQuestion.question;
    contestantAnswer = doc1.data()!.contestantAnswer;
    chaserAnswer = doc1.data()!.chaserAnswer;
  });
</script>

{#if gameState === -1}
  <div
    class="flex flex-col h-screen items-center justify-center bg-board-empty"
  >
    <h1 class="text-3xl font-bold text-center w-96 text-white">
      QUESTIONS PANEL
    </h1>
    <h1 class="text-3xl text-center w-96 text-white">
      Game not started. Start the game by pressing the button on the admin
      panel.
    </h1>
  </div>
{:else if gameState === 0}
  {#if questionState === 0}
    <div class="h-screen w-screen bg-board-empty"></div>
  {:else}
    <div
      class="flex flex-col h-screen items-center justify-center bg-board-empty"
    >
      <div class="flex flex-row items-start w-3/4 justify-between">
        {#if contestantAnswer == true}
          <div
            class="flex flex-col justify-center border-2 border-solid border-white rounded-md rounded-b-none text-center text-white text-3xl w-24 h-12 bg-gradient-to-b from-question-contestant-popout-start to-question-contestant-popout-end animate-slideIn z-0"
          >
            TIM
          </div>
        {:else}
          <div
            class="invisible flex flex-col justify-center border-2 border-solid border-white rounded-md rounded-b-none text-center text-white text-3xl w-24 h-12 bg-gradient-to-b from-question-contestant-popout-start to-question-contestant-popout-end"
          >
            TIM
          </div>
        {/if}

        {#if chaserAnswer == true}
          <div
            class="flex flex-col justify-center border-2 border-solid border-white rounded-md rounded-b-none text-center text-white text-3xl w-32 h-12 bg-gradient-to-b from-question-chaser-popout-start to-question-chaser-popout-end animate-slideIn z-0"
          >
            LOVAC
          </div>
        {/if}
      </div>
      <div
        class="flex flex-col h-48 items-center justify-center border-8 border-solid border-white rounded-2xl text-center text-white text-3xl w-4/5 bg-gradient-to-b from-question-bg-start to-question-bg-end z-10"
      >
        {question}
      </div>
      <div class="flex flex-row items-start w-3/4 justify-between space-x-3">
        <div
          class="flex flex-col justify-center border-2 border-solid border-white rounded-md rounded-t-none text-center text-white text-3xl w-1/3 h-12 bg-gradient-to-b from-question-answer-popout-start to-question-answer-popout-end"
        >
          A {answerA}
        </div>
        <div
          class="flex flex-col justify-center border-2 border-solid border-white rounded-md rounded-t-none text-center text-white text-3xl w-1/3 h-12 bg-gradient-to-b from-question-answer-popout-start to-question-answer-popout-end"
        >
          B {answerB}
        </div>
        <div
          class="flex flex-col justify-center border-2 border-solid border-white rounded-md rounded-t-none text-center text-white text-3xl w-1/3 h-12 bg-gradient-to-b from-question-answer-popout-start to-question-answer-popout-end"
        >
          C {answerC}
        </div>
      </div>
    </div>
  {/if}
{/if}
