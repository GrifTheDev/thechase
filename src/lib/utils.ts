import { PUBLIC_MAX_BOARD_LEN } from "$env/static/public";
import { questionList } from "./assets/questions";

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

async function changeQuestionState(newState: number) {
  if (newState > 1 || newState < 0) return {code: 400, message: `Max Length Exceeded`}

  await fetch("/api/question_state_change", {
    method: "POST",
    body: JSON.stringify({
      newState: newState
    }),
  });
}

async function submitContestantAnswer(answer: string) {
  if (answer.length > 1 || !answer.includes("ABC")) return {code: 400, message: "Answer must be a string value equal to A, B or C."}

  // TODO: Since this is gonna be a one-off school thing, no auth is ever required. However, if this were to be used in a more serious context, adding an API SECRET is important.
  await fetch("/api/submit_contestant_answer", {
    method: "POST",
    body: JSON.stringify({contestantAnswer: answer})
  })
}

export {changeGameState, setContestantPos, setChaserPos, changeQuestionState, submitContestantAnswer}