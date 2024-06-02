<script lang="ts">
  import { doc, onSnapshot } from "@firebase/firestore";
  import { getDB } from "$lib/firebase";
  import { PUBLIC_GAMEID } from "$env/static/public";
  import {
    changeGameState,
    changeQuestionState,
    setChaserPos,
    setContestantPos,
  } from "$lib/utils";
  let gameState = -2;
  let countContestant = -1;
  let countChaser = -1;
  let questionState = -1;
  let answerA = "";
  let answerB = "";
  let answerC = "";
  let correctAnswer = "";
  let difficulty = -1;
  let question = "";
  let contestantAnswer = false;
  let chaserAnswer = false;
  let chaserAnswerValue = "";
  let contestantAnswerValue = "";
  let answerSheet: any = {};
  let advanceQuestionShowLabel: any = {1: "Show Contestant Answer", 2: "Show Correct Answer", 3: "Show Chaser Answer", 4: "Next Question"}

  const { db } = getDB();

  onSnapshot(doc(db, "gameIDs", PUBLIC_GAMEID), (doc1) => {
    //console.log(doc1.data());
    gameState = doc1.data()!.gameState;
    countContestant = doc1.data()!.countContestant;
    countChaser = doc1.data()!.countChaser;
    questionState = doc1.data()!.questionState;
    answerA = doc1.data()!.currentQuestion.answerA;
    answerB = doc1.data()!.currentQuestion.answerB;
    answerC = doc1.data()!.currentQuestion.answerC;
    correctAnswer = doc1.data()!.currentQuestion.correctAnswer;
    difficulty = doc1.data()!.currentQuestion.difficulty;
    question = doc1.data()!.currentQuestion.question;
    contestantAnswer = doc1.data()!.contestantAnswer;
    chaserAnswer = doc1.data()!.chaserAnswer;
    chaserAnswerValue = doc1.data()!.chaserAnswerValue;
    contestantAnswerValue = doc1.data()!.contestantAnswerValue;

    answerSheet = { A: answerA, B: answerB, C: answerC };
  });
</script>

{#if gameState === -1}
  <div class="flex flex-col h-screen items-center justify-center bg-stone-500">
    <h1 class="text-3xl font-bold text-center w-96 text-white">ADMIN PANEL</h1>
    <h1 class="text-3xl text-center w-96 text-white">
      Game not started. Start the game by pressing the button below.
    </h1>

    <button
      class="border border-white text-white rounded-md p-1"
      on:click={() => {
        changeGameState(0);
      }}>Start Game</button
    >
  </div>
{:else if gameState === 0}
  <div class="flex flex-col h-screen items-center bg-stone-500">
    <h1 class="text-4xl text-center font-bold w-100 text-white">
      Chase Sequence ({gameState + 1}) - Admin Dashboard
    </h1>
    <div class="w-screen h-3"></div>
    <!-- Devider -->

    <div class="flex flex-col items-center">
      {#if questionState === 0}
        <h2 class="text-2xl text-white text-center font-bold">
          Question Controls
        </h2>
        <p class="text-white">No question currently active.</p>

        <button
          class="border border-white text-white rounded-md p-1"
          on:click={async () => {
            changeQuestionState(1);
          }}>Next Question</button
        >
      {:else}
        <div
          class="flex flex-col w-screen justify-center px-32 border-2 border-white rounded-xl"
        >
          <h2 class="text-2xl text-white text-center font-bold">
            Question Controls
          </h2>
          <div class="flex flex-row justify-center text-center">
            <p class="text-white text-xl">
              <span class="font-bold">Current Question: </span>{question}
            </p>
          </div>
          <div class="flex flex-row justify-between">
            <p class="text-white text-xl">
              <span class="font-bold">A: </span>{answerA}
            </p>
            <p class="text-white text-xl">
              <span class="font-bold">B: </span>{answerB}
            </p>
            <p class="text-white text-xl">
              <span class="font-bold">C: </span>{answerC}
            </p>
          </div>
          <div class="flex flex-row justify-center">
            <p class="text-white text-xl">
              <span class="font-bold">Correct Answer: </span>{correctAnswer}
            </p>
          </div>
          <div class="flex flex-row justify-center">
            <p class="text-white text-xl">
              <span class="font-bold">Question Difficulty: </span>{difficulty}
            </p>
          </div>
        </div>
      {/if}
    </div>

    <div class="w-screen h-3"></div>
    <h2 class="text-2xl text-white font-bold">
      Chaser/Contestant Position Controls
    </h2>
    <div class="flex flex-row items-center">
      <button
        class="border border-white text-white rounded-md p-1"
        on:click={async () => {
          setContestantPos(countContestant + 1);
        }}>+</button
      >
      <p class="w-30 text-white text-nowrap">Contestant ({countContestant})</p>
      <button
        class="border border-white text-white rounded-md p-1"
        on:click={() => {
          setContestantPos(countContestant - 1);
        }}>-</button
      >
      <div class="w-2 h-3"></div>
      <button
        class="border border-white text-white rounded-md p-1"
        on:click={() => {
          setChaserPos(countChaser + 1);
        }}>+</button
      >
      <p class="text-white">Chaser ({countChaser})</p>
      <button
        class="border border-white text-white rounded-md p-1"
        on:click={() => {
          setChaserPos(countChaser - 1);
        }}>-</button
      >
    </div>

    <h2 class="text-2xl text-white font-bold">Answer States</h2>
    <div class="flex flex-row items-center">
      {#if contestantAnswer == true}
        <div class="flex flex-col items-center">
          <div
            class="border-2 border-solid border-white rounded-md text-center text-white text-3xl w-24 h-10 bg-gradient-to-b from-question-contestant-popout-start to-question-contestant-popout-end"
          >
            TIM
          </div>
          <p class="text-white">
            <span class="font-bold">Answered: </span>{answerSheet[
              contestantAnswerValue
            ]}
          </p>
        </div>
      {:else}
        <div
          class="border-2 border-solid border-white rounded-md text-center text-white text-3xl w-24 h-10"
        >
          TIM
        </div>
      {/if}

      {#if chaserAnswer == true}
        <div class="flex flex-col items-center">
          <div
            class="ml-20 p-1/5 border-2 border-solid border-white rounded-md text-center text-white text-3xl w-28 h-10 bg-gradient-to-b from-question-chaser-popout-start to-question-chaser-popout-end"
          >
            LOVAC
          </div>
          <p class="text-white text-center ml-20">
            <span class="font-bold">Answered: </span>{answerSheet[
              chaserAnswerValue
            ]}
          </p>
        </div>
      {:else}
        <div
          class="ml-20 border-2 border-solid border-white rounded-md text-center text-white text-3xl w-28 h-10 p-1/5"
        >
          LOVAC
        </div>
      {/if}
    </div>

    {#if contestantAnswer == true && chaserAnswer == true && questionState > 0}
    <h2 class="text-2xl text-white font-bold">Advance Answer Show</h2>
    <div class="flex flex-row items-center"> 
      <button
          class="border border-white text-white rounded-md p-1"
          on:click={async () => {
            changeQuestionState(questionState+1);
          }}>{advanceQuestionShowLabel[questionState] || "Whoops"}</button
        >
    </div>
    {/if}
  </div>
{:else}
  <p>Loading...</p>
{/if}
