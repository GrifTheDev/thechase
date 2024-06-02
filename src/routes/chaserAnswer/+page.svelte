<script lang="ts">
    import { doc, onSnapshot } from "@firebase/firestore";
    import { getDB } from "$lib/firebase";
    import { PUBLIC_GAMEID } from "$env/static/public";
    import { submitChaserAnswer } from "$lib/utils";

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
    let answerSheet: any = {}
    let chaserAnswerValue: string = ""
  
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
      chaserAnswerValue = doc1.data()!.chaserAnswerValue;

      answerSheet = {A: answerA, B: answerB, C: answerC}
    });


  </script>
  
  <div class="bg-board-empty flex flex-col h-screen overflow-hidden">
    {#if questionState == 0}
      <div class="flex flex-col h-screen items-center justify-center">
        <h1 class="text-3xl font-bold text-center w-96 text-white">
          CHASER ANSWER PANEL
        </h1>
        <h1 class="text-3xl text-center w-96 text-white">
          No current question. Please wait for the host to queue a question.
        </h1>
      </div>
      <!--prettier-ignore-->
    {:else}
      {#if chaserAnswer == false}
        <div
          class="flex flex-col h-48 items-center justify-center border-8 border-solid border-white rounded-2xl text-center text-white text-3xl w-screen bg-gradient-to-b from-question-chaser-popout-start to-question-chaser-popout-end"
        >
          {question}
        </div>
        <div class="m-4"></div>
        <button
          on:click={async () => {
            submitChaserAnswer("A");
          }}
          class="w-screen h-1/5 text-white text-center border-2 border-solid border-white rounded-2xl bg-gradient-to-b from-question-answer-popout-start to-question-answer-popout-end text-3xl active:border-8 active:scale-95 select-none"
          >{answerA}</button
        >
        <button
          on:click={async () => {
            submitChaserAnswer("B");
          }}
          class="mt-2 mb-2 w-screen h-1/5 text-white text-center border-2 border-solid border-white rounded-2xl bg-gradient-to-b from-question-answer-popout-start to-question-answer-popout-end text-3xl active:border-8 active:scale-95 select-none"
          >{answerB}</button
        >
        <button
          on:click={async () => {
            submitChaserAnswer("C");
          }}
          class="w-screen h-1/5 text-white text-center border-2 border-solid border-white rounded-2xl bg-gradient-to-b from-question-answer-popout-start to-question-answer-popout-end text-3xl active:border-8 active:scale-95 select-none"
          >{answerC}</button
        >
        {:else}
        <div class="flex flex-col h-screen items-center justify-center">
            <h1 class="text-3xl font-bold text-center w-96 text-white">
              ANSWER SUBMITTED
            </h1>
            <h1 class="text-3xl text-center w-96 text-white">
              Your answer: {answerSheet[chaserAnswerValue]}
            </h1>
          </div>
      {/if}
    {/if}
  </div>
  