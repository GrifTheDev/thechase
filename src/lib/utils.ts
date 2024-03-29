import { PUBLIC_MAX_BOARD_LEN } from "$env/static/public";

async function changeGameState(newState: number) {
    await fetch("/api/game_state_change", {
        method: "POST",
        body: JSON.stringify({
          gameState: newState
        }),
      });
}

async function setContestantPos(newPos: number) {
  if (newPos > Number(PUBLIC_MAX_BOARD_LEN) || newPos < 0) return {code: 400, message: `Max Length Exceeded`}

  await fetch("/api/set_contestant_pos", {
    method: "POST",
    body: JSON.stringify({
      newPosition: newPos
    }),
  });
}

async function setChaserPos(newPos: number) {
  if (newPos > Number(PUBLIC_MAX_BOARD_LEN) || newPos < 0) return {code: 400, message: `Max Length Exceeded`}

  await fetch("/api/set_chaser_pos", {
    method: "POST",
    body: JSON.stringify({
      newPosition: newPos
    }),
  });
}


export {changeGameState, setContestantPos, setChaserPos}