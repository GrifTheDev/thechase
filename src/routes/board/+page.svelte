<script lang="ts">
  import chaser_arrow from "$lib/assets/chaser_arrow.png";
  import { doc, onSnapshot } from "@firebase/firestore";
  import { getDB } from "$lib/firebase";
  import { PUBLIC_GAMEID } from "$env/static/public"

  // "hziydQCTfw7b"
  let apiRes: { err_code: number; err_info: string } | undefined;
  const { db } = getDB();

  // -2 = not done anything
  // -1 = no GameId
  let gameState = -2;

  /* async function sendIDAPI() {
    const res = await fetch("/api/start_game", {
      method: "POST",
      body: JSON.stringify({ gameId: gameId }),
    });

    apiRes = await res.json();
  } */
  onSnapshot(doc(db, "gameIDs", PUBLIC_GAMEID), (doc1) => {
    //console.log(doc1.data());
    gameState = doc1.data()!.gameState;
    //console.log(gameState);
  });
</script>

Debug: gameState = {gameState}

{#if gameState === -1}
  <div class="flex flex-col items-center text-center">
    <h1 class="text-3xl text-center w-96">
      Start the game by pressing the button on the admin panel.
    </h1>
    <!-- <button
      type="submit"
      class="border border-black p-2 mt-2 rounded-lg"
      >Submit</button
    > -->
  </div>
{:else if gameState === 0}
  <div class="flex flex-col h-screen items-center justify-center">
    <div
      class="border-2 border-solid border-black w-96 h-32 rounded-md bg-board-chaser"
    ></div>

    <div
      class="border-2 border-solid border-black w-96 h-32 rounded-md bg-board-chaser"
    >
      <img alt="A chaser arrow" src={chaser_arrow} class="" />
    </div>

    <div
      class="border-2 border-solid border-black w-96 h-32 rounded-md bg-board-contestant"
    ></div>

    <div
      class="border-2 border-solid border-black w-96 h-32 rounded-md bg-board-empty"
    ></div>

    <div
      class="border-2 border-solid border-black w-96 h-32 rounded-md bg-board-empty"
    ></div>

    <div
      class="border-2 border-solid border-black w-96 h-32 rounded-md bg-board-empty"
    ></div>

    <div
      class="border-2 border-solid border-black w-96 h-32 rounded-md bg-board-empty"
    ></div>
  </div>

{:else}
<p>Loading...</p>
{/if}
