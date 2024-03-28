<script lang="ts">
  import { doc, onSnapshot } from "@firebase/firestore";
  import { getDB } from "$lib/firebase";
  import { PUBLIC_GAMEID } from "$env/static/public";
  import { changeGameState } from "$lib/utils";
  let gameState = -2;
  const { db } = getDB();

  onSnapshot(doc(db, "gameIDs", PUBLIC_GAMEID), (doc1) => {
    //console.log(doc1.data());
    gameState = doc1.data()!.gameState;
    //console.log(gameState);
  });

  // @ts-ignore
  export let response;
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
  <h1 class="text-3xl text-center w-96">Chaser1 Game Dashboard</h1>
</div>
{:else}
  <p>Loading...</p>
{/if}
