<script lang="ts">
  import chaser_arrow from "$lib/assets/chaser_arrow.png";
  import { doc, onSnapshot } from "@firebase/firestore";
  import { getDB } from "$lib/firebase";
  import { PUBLIC_GAMEID } from "$env/static/public";

  let apiRes: { err_code: number; err_info: string } | undefined;
  const { db } = getDB();

  // -2 = not done anything
  // -1 = no GameId
  let gameState = -2;
  let countContestant = -1;
  let countChaser = -1;
  let remainder = -1;

  onSnapshot(doc(db, "gameIDs", PUBLIC_GAMEID), (doc1) => {
    //console.log(doc1.data());
    gameState = doc1.data()!.gameState;
    countContestant = doc1.data()!.countContestant;
    countChaser = doc1.data()!.countChaser;
    remainder = 6 - countContestant;
    console.log(gameState, countContestant, countChaser, remainder);
    console.log(countContestant - countChaser);
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
    {#each Array(countChaser).fill(0) as item, i}
      {#if countChaser - 1 == i}
        <div
          class="border-2 border-solid border-black w-96 h-32 rounded-md bg-board-chaser"
        >
          <img alt="A chaser arrow" src={chaser_arrow} class="" />
        </div>
      {:else}
        <div
          class="border-2 border-solid border-black w-96 h-32 rounded-md bg-board-chaser"
        ></div>
      {/if}
    {/each}

    {#each Array(countContestant - countChaser).fill(0) as item, i}
      {#if countContestant - countChaser - 1 == i}
        <div
          class="border-2 border-solid border-black w-96 h-32 rounded-md bg-board-contestant"
        >
          <div class="flex flex-row h-32 items-center justify-center text-center text-5xl text-white drop-shadow-xl font-bold">
            <div class="h-14">
              ➤ TIM {gameState + 1}
              
            </div>
            <p class="rotate-180">➤</p>
          </div>
        </div>
      {:else}
        <div
          class="border-2 border-solid border-black w-96 h-32 rounded-md bg-board-contestant"
        ></div>
      {/if}
    {/each}

    {#each Array(remainder).fill(0) as item, i}
      <div
        class="border-2 border-solid border-black w-96 h-32 rounded-md bg-board-empty"
      ></div>
    {/each}

    <!-- <div
      class="border-2 border-solid border-black w-96 h-32 rounded-md bg-board-chaser"
    ></div>

    <div
      class="border-2 border-solid border-black w-96 h-32 rounded-md bg-board-chaser"
    >
      <img alt="A chaser arrow" src={chaser_arrow} class="" />
    </div> -->

    <!-- <div
      class="border-2 border-solid border-black w-96 h-32 rounded-md bg-board-empty"
    ></div>

    <div
      class="border-2 border-solid border-black w-96 h-32 rounded-md bg-board-empty"
    ></div>
    <div
      class="border-2 border-solid border-black w-96 h-32 rounded-md bg-board-empty"
    ></div> -->
  </div>
{:else}
  <p>Loading...</p>
{/if}
