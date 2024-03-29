<script lang="ts">
  import { doc, onSnapshot } from "@firebase/firestore";
  import { getDB } from "$lib/firebase";
  import { PUBLIC_GAMEID } from "$env/static/public";
  import { changeGameState, setChaserPos, setContestantPos } from "$lib/utils";
  let gameState = -2;
  let countContestant = -1;
  let countChaser = -1;

  const { db } = getDB();

  onSnapshot(doc(db, "gameIDs", PUBLIC_GAMEID), (doc1) => {
    //console.log(doc1.data());
    gameState = doc1.data()!.gameState;
    countContestant = doc1.data()!.countContestant;
    countChaser = doc1.data()!.countChaser;
  });
</script>

{#if gameState === -1}
  <div class="flex flex-col items-center">
    <h1 class="text-3xl text-center w-96">
      Game not started. Start it using the button below.
    </h1>

    <!-- <h2>First group name:</h2>
    <input
      name="id"
      autocomplete="off"
      required
      class="border-2 rounded-md border-black m-1"
    /> <br />
    -->
    <button
      class="border border-black rounded-md p-1"
      on:click={() => {
        changeGameState(0);
      }}>Start Game</button
    >
    <!-- // @ts-ignore
    {#if response?.err_code}
      {response.err_info}
    {/if} -->
  </div>
{:else if gameState === 0}
  <div class="flex flex-col items-center">
    <h1 class="text-3xl text-center font-bold w-100">
      Chase Sequence ({gameState + 1}) - Admin Dashboard
    </h1>
    <div class="w-screen h-3"></div>
    <!-- Devider -->

    <h2 class="text-xl">Chaser/Contestant Position Controls</h2>
    <div class="flex flex-row items-center">
      <button
        class="border border-black rounded-md p-1"
        on:click={async () => {
          setContestantPos(countContestant + 1);
        }}>+</button
      >
      <p class="w-30 text-nowrap">Contestant ({countContestant})</p>
      <button
        class="border border-black rounded-md p-1"
        on:click={() => {
          setContestantPos(countContestant - 1);
        }}>-</button
      >
      <div class="w-2 h-3"></div>
      <button
        class="border border-black rounded-md p-1"
        on:click={() => {
          setChaserPos(countChaser + 1);
        }}>+</button
      >
      <p>Chaser ({countChaser})</p>
      <button
        class="border border-black rounded-md p-1"
        on:click={() => {
          setChaserPos(countChaser - 1);
        }}>-</button
      >
    </div>
  </div>
{:else}
  <p>Loading...</p>
{/if}
