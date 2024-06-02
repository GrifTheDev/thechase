import { PUBLIC_MAX_BOARD_LEN } from "$env/static/public";
import { questionList } from "./assets/questions";

async function changeGameState(newState: number) {
  await fetch("/api/game_state_change", {
    method: "POST",
    body: JSON.stringify({
      gameState: newState,
    }),
  });
}

async function setContestantPos(newPos: number) {
  if (newPos > Number(PUBLIC_MAX_BOARD_LEN) || newPos < 0)
    return { code: 400, message: `Max Length Exceeded` };

  await fetch("/api/set_contestant_pos", {
    method: "POST",
    body: JSON.stringify({
      newPosition: newPos,
    }),
  });
}

async function setChaserPos(newPos: number) {
  if (newPos > Number(PUBLIC_MAX_BOARD_LEN) || newPos < 0)
    return { code: 400, message: `Max Length Exceeded` };

  await fetch("/api/set_chaser_pos", {
    method: "POST",
    body: JSON.stringify({
      newPosition: newPos,
    }),
  });
}

async function changeQuestionState(newState: number) {

  if (newState > 4) {
    await fetch("/api/reset_question_round", {
      method: "POST",
      body: JSON.stringify({
        // TODO: Delegate this behaviour to env. I know I wrote that I will add auth later but it feels wrong to have such an important path exposed with no auth.
        auth: "this123is123a123password",
      }),
    });
  } else if (newState == 3 || newState == 4) {
    await fetch("/api/advance_board", {
      method: "POST",
      body: JSON.stringify({
        // TODO: Delegate this behaviour to env. I know I wrote that I will add auth later but it feels wrong to have such an important path exposed with no auth.
        auth: "this123is123a123password",
        questionState: newState
      }),
    });
    await fetch("/api/question_state_change", {
      method: "POST",
      body: JSON.stringify({
        newState: newState,
      }),
    });
  } else {
    await fetch("/api/question_state_change", {
      method: "POST",
      body: JSON.stringify({
        newState: newState,
      }),
    });
  }

  
}

async function submitContestantAnswer(answer: string) {
  if (answer.length > 1)
    return {
      code: 400,
      message: "Answer must be a string value equal to A, B or C.",
    };

  // TODO: Since this is gonna be a one-off school thing, no auth is ever required. However, if this were to be used in a more serious context, adding an API SECRET is important.
  await fetch("/api/submit_contestant_answer", {
    method: "POST",
    body: JSON.stringify({ contestantAnswerV: answer }),
  });
}

async function submitChaserAnswer(answer: string) {
  if (answer.length > 1)
    return {
      code: 400,
      message: "Answer must be a string value equal to A, B or C.",
    };

  // TODO: Since this is gonna be a one-off school thing, no auth is ever required. However, if this were to be used in a more serious context, adding an API SECRET is important.
  await fetch("/api/submit_chaser_answer", {
    method: "POST",
    body: JSON.stringify({ chaserAnswerV: answer }),
  });
}

async function changeSlideOut(value: boolean) {
  await fetch("/api/change_slide_out", {
    method: "POST",
    body: JSON.stringify({ newValue: value }),
  });
}

async function advanceGameNextTeam() {
  await fetch("/api/advance_game_next_team", {
    method: "POST",
    body: JSON.stringify({
      // TODO: Delegate this behaviour to env. I know I wrote that I will add auth later but it feels wrong to have such an important path exposed with no auth.
      auth: "this123is123a123password",
    }),
  });
}

async function changeStepContestantFC(newSteps: number) {
  await fetch("/api/change_cont_step_fc", {
    method: "POST",
    body: JSON.stringify({
      // TODO: Delegate this behaviour to env. I know I wrote that I will add auth later but it feels wrong to have such an important path exposed with no auth.
      newSteps: newSteps,
    }),
  });

  await fetch("/api/question_state_change", {
    method: "POST",
    body: JSON.stringify({
      newState: 1,
    }),
  });
}

export {
  changeGameState,
  setContestantPos,
  setChaserPos,
  changeQuestionState,
  submitContestantAnswer,
  submitChaserAnswer,
  changeSlideOut,
  advanceGameNextTeam,
  changeStepContestantFC
};
