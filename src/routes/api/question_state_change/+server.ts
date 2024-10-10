import { questionList } from "$lib/assets/questions";
import { log } from "$lib/logger";
import { readDocData, updateDocData } from "$lib/database.js";
import { PUBLIC_GAMEID } from "$env/static/public";
import type { RequestHandler } from "./$types";
//import { json } from "@sveltejs/kit" return json(a+b)

export const POST: RequestHandler = async ({ request }) => {
  const { newState } = await request.json();

  if (newState === 1) {
    let qData = await getQ();

    await updateDocData("gameIDs", PUBLIC_GAMEID, {
      questionState: newState,
      currentQuestion: {
        answerA: qData!.answerA,
        answerB: qData!.answerB,
        answerC: qData!.answerC,
        correctAnswer: qData!.correctAnswer,
        difficulty: qData!.difficulty,
        question: qData!.question,
        id: qData!.id,
      },
    });
  } else {
    await updateDocData("gameIDs", PUBLIC_GAMEID, {
      questionState: newState,
    });
  }

  return new Response(JSON.stringify({ code: 200, message: "Success" }));
};

// @ts-ignore
async function getQ() {
  const { id, question, answerA, answerB, answerC, correctAnswer, difficulty } =
    questionList[Math.floor(Math.random() * questionList.length)];
  const currentData = await readDocData("gameIDs", PUBLIC_GAMEID);
  // @ts-ignore
  let { usedQuestions, questionSum } = currentData;

  if (questionSum >= 75) {
    await updateDocData("gameIDs", PUBLIC_GAMEID, {
      usedQuestions: Array(84).fill(0),
      questionSum: 0,
    });
    usedQuestions = Array(84).fill(0);
    questionSum = 0;
  }

  if (usedQuestions[id] == 1) {
    console.log(`question with id ${id} already exists, rerolling`);
    return await getQ();
  } else {
    usedQuestions[id] = 1;
    await updateDocData("gameIDs", PUBLIC_GAMEID, {
      usedQuestions: usedQuestions,
      questionSum: questionSum + 1,
    });
    // TODO WRITE NEW QUESTION SUM
    return {
      id,
      question,
      answerA,
      answerB,
      answerC,
      correctAnswer,
      difficulty,
    };
  }
}
