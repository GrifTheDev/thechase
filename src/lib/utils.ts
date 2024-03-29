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
  if(newState === 1) await assignNewQuestion()

  await fetch("/api/question_state_change", {
    method: "POST",
    body: JSON.stringify({
      newState: newState
    }),
  });
}

async function assignNewQuestion() {
  const {question, answerA, answerB, answerC, correctAnswer, difficulty} = questionList[Math.floor(Math.random() * questionList.length)]
}


export {changeGameState, setContestantPos, setChaserPos, changeQuestionState}