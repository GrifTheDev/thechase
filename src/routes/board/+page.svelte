<script lang="ts">
  import chaser_arrow from "$lib/assets/chaser_arrow.png";
  import { doc, onSnapshot } from "@firebase/firestore";
  import { getDB } from "$lib/firebase";
  import { PUBLIC_GAMEID, PUBLIC_MAX_BOARD_LEN } from "$env/static/public";
  import { updateDocData } from "$lib/database";
  let apiRes: { err_code: number; err_info: string } | undefined;
  const { db } = getDB();

  // -2 = not done anything
  // -1 = no GameId
  let gameState = -2;
  let countContestant = -1;
  let countChaser = -1;
  let remainder = -1;
  let chaserVictory = false;
  let contestantVictory = false;
  let finalChaseSteps = 0;
  let timerRun = false;
  let finalChaserSteps = 0;
  let timerReset = false
  $: timer = 120;

  let decreaseTimer: any;

  onSnapshot(doc(db, "gameIDs", PUBLIC_GAMEID), (doc1) => {
    //console.log(doc1.data());
    gameState = doc1.data()!.gameState;
    countContestant = doc1.data()!.countContestant;
    countChaser = doc1.data()!.countChaser;
    remainder = Number(PUBLIC_MAX_BOARD_LEN) - countContestant;
    chaserVictory = doc1.data()!.chaserVictory;
    contestantVictory = doc1.data()!.contestantVictory;
    finalChaseSteps = doc1.data()!.finalCSteps;
    timerRun = doc1.data()!.timerRun;
    finalChaserSteps = doc1.data()!.finalChsrSteps;

    if (timerReset == false && gameState == 4) {
      timer = 120
      timerReset = true
    }
    //console.log(timerRun, decreaseTimer == undefined, !timerRun, decreaseTimer != undefined)
    if (gameState > 2) {
      if (timerRun && decreaseTimer == undefined) {
        decreaseTimer = setInterval(() => {
          timer -= 1;
          console.log(":the" + timer);
          if (Number(timer) <= 0) {
            updateDocData("gameIDs", PUBLIC_GAMEID, {
              finalChaseTComplete: true,
              timerRun: false,
            });
            clearImmediate(decreaseTimer);
          }
        }, 1000);
        decreaseTimer;
      } else if (!timerRun && decreaseTimer != undefined) {
        clearInterval(decreaseTimer);
        decreaseTimer = undefined;
      }
    }

    /*  console.log(gameState, countContestant, countChaser, remainder);
    console.log(countContestant - countChaser); */
  });
</script>

{#if gameState === -1}
  <div class="flex flex-col h-screen items-center justify-center bg-slate-500">
    <h1 class="text-3xl font-bold text-center w-96 text-white">BOARD PANEL</h1>
    <h1 class="text-3xl text-center w-96 text-white">
      Game not started. Start the game by pressing the button on the admin
      panel.
    </h1>
  </div>
{:else if gameState > -1 && gameState < 3}
  {#if contestantVictory == true}
    <div
      class="flex flex-col h-screen items-center justify-center bg-board-contestant animate-slideIn"
    >
      <h1 class="text-4xl font-bold text-center w-96 text-white animate-pulse">
        Tim {gameState + 1} je pobijedio!
      </h1>
    </div>
  {:else if chaserVictory == true}
    <div
      class="flex flex-col h-screen items-center justify-center bg-board-chaser animate-slideIn"
    >
      <h1 class="text-4xl font-bold text-center w-96 text-white animate-pulse">
        Lovkinje su pobijedile!
      </h1>
    </div>
  {:else}
    <div
      class="flex flex-col h-screen items-center justify-center bg-slate-500"
    >
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
            <div
              class="flex flex-row h-32 items-center justify-center text-center text-5xl text-white drop-shadow-xl font-bold"
            >
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
    </div>
  {/if}
{:else if gameState == 3}
  <div class="bg-slate-800">
    <div
      class="flex flex-col h-screen items-center justify-center animate-fadeIn"
    >
      <div class="flex flex-row items-start w-4/5 justify-between">
        <div
          class="invisible flex flex-col justify-center border-2 border-solid border-white rounded-md rounded-b-none text-center text-white text-3xl w-24 h-12 bg-gradient-to-b from-question-contestant-popout-start to-question-contestant-popout-end animate-slideIn z-0"
        >
          placeholder
        </div>
        <div
          class=" flex flex-col justify-center border-2 border-solid border-white rounded-md rounded-b-none text-center text-white text-3xl w-24 h-12 bg-gradient-to-b from-timer-bg-start to-timer-bg-end"
        >
          {Number(timer) % 60 > 0 && Number(timer) % 60 < 10
            ? Math.floor(Number(timer) / 60) + ":0" + (Number(timer) % 60)
            : Math.floor(Number(timer) % 60) == 0
              ? Math.floor(Number(timer) / 60) +
                ":" +
                (Number(timer) % 60) +
                "0"
              : Math.floor(Number(timer) / 60) + ":" + (Number(timer) % 60)}
        </div>
      </div>
      <div
        class="flex flex-row h-48 items-center justify-center border-8 border-solid border-white rounded-2xl w-5/6"
      >
        {#each Array(finalChaseSteps).fill(0) as item, i}
          {#if finalChaseSteps == 1}
            <div
              class="bg-gradient-to-b from-question-contestant-popout-start to-question-contestant-popout-end h-44 border-black rounded-md rounded-br-md flex-auto"
            >
              {i + 1}
            </div>
          {:else if i == 0}
            <div
              class="bg-gradient-to-b from-question-bg-start to-question-bg-end h-44 rounded-tl-md rounded-bl-md flex-auto"
            >
              <div
                class="text-clip flex flex-1 h-44 items-center justify-center text-white font-bold text-8xl"
              >
                {i + 1}
              </div>
            </div>
          {:else if i == finalChaseSteps - 1}
            <div
              class="bg-gradient-to-b from-question-contestant-popout-start to-question-contestant-popout-end h-44 border-l-8 border-black rounded-tr-md rounded-br-md flex-auto"
            >
              <div
                class="text-clip flex flex-1 h-44 items-center justify-center text-white font-bold text-8xl"
              >
                {i + 1}
              </div>
            </div>
          {:else}
            <div
              class="text-clip bg-gradient-to-b from-question-bg-start to-question-bg-end h-44 border-l-8 border-black flex-auto"
            >
              <p
                class="text-clip flex flex-1 h-44 items-center justify-center text-white font-bold text-xl"
              >
                {i + 1}
              </p>
            </div>
          {/if}
        {/each}
      </div>
    </div>
  </div>
{:else if gameState == 4}
  <div class="bg-slate-800">
    <div
      class="flex flex-col h-screen items-center justify-center animate-fadeIn"
    >
      <div class="flex flex-row items-start w-4/5 justify-between">
        <div
          class="invisible flex flex-col justify-center border-2 border-solid border-white rounded-md rounded-b-none text-center text-white text-3xl w-24 h-12 bg-gradient-to-b from-question-contestant-popout-start to-question-contestant-popout-end animate-slideIn z-0"
        >
          placeholder
        </div>
        <div
          class=" flex flex-col justify-center border-2 border-solid border-white rounded-md rounded-b-none text-center text-white text-3xl w-24 h-12 bg-gradient-to-b from-timer-bg-start to-timer-bg-end"
        >
          {Number(timer) % 60 > 0 && Number(timer) % 60 < 10
            ? Math.floor(Number(timer) / 60) + ":0" + (Number(timer) % 60)
            : Math.floor(Number(timer) % 60) == 0
              ? Math.floor(Number(timer) / 60) +
                ":" +
                (Number(timer) % 60) +
                "0"
              : Math.floor(Number(timer) / 60) + ":" + (Number(timer) % 60)}
        </div>
      </div>
      <div
        class="flex flex-row h-48 items-center justify-center border-8 border-solid border-white rounded-2xl w-5/6"
      >
        {#each Array(finalChaserSteps).fill(0) as item, i}
          {#if finalChaserSteps == 1}
            <div
              class="bg-gradient-to-b from-question-chaser-popout-start to-question-chaser-popout-end h-44 border-black rounded-md rounded-br-md flex-auto"
            >
            <div
            class="text-clip flex flex-1 h-44 items-center justify-center text-white font-bold text-8xl"
          >
            {i + 1}
          </div>
            </div>
          {:else if i == 0}
            <div
              class="bg-gradient-to-b from-question-chaser-popout-start to-question-chaser-popout-end h-44 rounded-tl-md rounded-bl-md flex-auto"
            >
              <div
                class="text-clip flex flex-1 h-44 items-center justify-center text-white font-bold text-8xl"
              >
              </div>
            </div>
          {:else if i == finalChaserSteps - 1}
            <div
              class="bg-gradient-to-b from-question-chaser-popout-start to-question-chaser-popout-end h-44 border-l-8 border-r-8 border-black rounded-tr-md rounded-br-md flex-auto"
            >
              <div
                class="text-clip flex flex-1 h-44 items-center justify-center text-white font-bold text-8xl"
              >
                {i + 1}
              </div>
            </div>
          {:else}
            <div
              class="text-clip bg-gradient-to-b from-question-chaser-popout-start to-question-chaser-popout-end border-l-8 border-black flex-auto"
            >
              <p
                class="text-clip flex flex-1 h-44 items-center justify-center text-white font-bold text-xl"
              >
              </p>
            </div>
          {/if}
        {/each}

        {#each Array(finalChaseSteps - finalChaserSteps).fill(0) as item, i}
          {#if finalChaseSteps - finalChaserSteps == 1}
            <div
              class="bg-gradient-to-b from-question-contestant-popout-start to-question-contestant-popout-end h-44 border-black rounded-md rounded-br-md flex-auto"
            >
            <div
            class="text-clip flex flex-1 h-44 items-center justify-center text-white text-8xl font-bold"
          >
            {i + finalChaserSteps + 1}
          </div>
            </div>
          {:else if i == 0}
            <div
              class="bg-gradient-to-b from-question-bg-start to-question-bg-end h-44 rounded-tl-md rounded-bl-md flex-auto"
            >
              <div
                class="text-clip flex flex-1 h-44 items-center justify-center text-white text-xl"
              >
                {i + finalChaserSteps + 1}
              </div>
            </div>
          {:else if i == (finalChaseSteps - finalChaserSteps) - 1}
            <div
              class="bg-gradient-to-b from-question-contestant-popout-start to-question-contestant-popout-end h-44 border-l-8 border-black rounded-tr-md rounded-br-md flex-auto"
            >
              <div
                class="text-clip flex flex-1 h-44 items-center justify-center text-white font-bold text-8xl"
              >
                {i + finalChaserSteps+ 1}
              </div>
            </div>
          {:else}
            <div
              class="text-clip bg-gradient-to-b from-question-bg-start to-question-bg-end h-44 border-l-8 border-black flex-auto"
            >
              <p
                class="text-clip flex flex-1 h-44 items-center justify-center text-white font-bold text-xl"
              >
                {i + finalChaserSteps + 1}
              </p>
            </div>
          {/if}
        {/each}
      </div>
    </div>
  </div>
{:else}
  <p>Loading...</p>
{/if}
