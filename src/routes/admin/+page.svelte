<script lang="ts">
  import { doc, onSnapshot } from "@firebase/firestore";
  import { getDB } from "$lib/firebase";
  import { PUBLIC_GAMEID } from "$env/static/public";
  import { changeGameState, changeQuestionState, setChaserPos, setContestantPos } from "$lib/utils";
  let gameState = -2;
  let countContestant = -1;
  let countChaser = -1;
  let questionState = -1;

  const { db } = getDB();

  onSnapshot(doc(db, "gameIDs", PUBLIC_GAMEID), (doc1) => {
    //console.log(doc1.data());
    gameState = doc1.data()!.gameState;
    countContestant = doc1.data()!.countContestant;
    countChaser = doc1.data()!.countChaser;
    questionState = doc1.data()!.questionState;
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
    <h1 class="text-3xl text-center font-bold w-100 text-white">
      Chase Sequence ({gameState + 1}) - Admin Dashboard
    </h1>
    <div class="w-screen h-3"></div>
    <!-- Devider -->

    <div class="flex flex-col items-center">
      <h2 class="text-xl text-white">Question Controls</h2>
      {#if questionState === 0}
        <p class="text-white">No question currently active.</p>

        <button
          class="border border-white text-white rounded-md p-1"
          on:click={async () => {
            changeQuestionState(1)
          }}>Next Question</button
        >
      {/if}
    </div>

    <div class="w-screen h-3"></div>
    <h2 class="text-xl text-white">Chaser/Contestant Position Controls</h2>
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
  </div>
{:else}
  <p>Loading...</p>
{/if}
