import { questionList } from "$lib/assets/questions";
import { log } from "$lib/logger";
import { readDocData, updateDocData } from "$lib/database.js";
import { PUBLIC_GAMEID } from "$env/static/public";
import type { RequestHandler } from "./$types";
//import { json } from "@sveltejs/kit" return json(a+b)

export const POST: RequestHandler = async({ request }) => {
  const { newState } = await request.json();

  if (newState === 1) {
    const { question, answerA, answerB, answerC, correctAnswer, difficulty } =
      questionList[Math.floor(Math.random() * questionList.length)];

    await updateDocData("gameIDs", PUBLIC_GAMEID, {
      questionState: newState,
      currentQuestion: {
        answerA: answerA,
        answerB: answerB,
        answerC: answerC,
        correctAnswer: correctAnswer,
        difficulty: difficulty,
        question: question,
      },
    });
  } else if (newState === 0) {
    await updateDocData("gameIDs", PUBLIC_GAMEID, {
      questionState: newState,
    });
  } else {
    return new Response(JSON.stringify({ code: 400, message: "Bad Request (Malformed)" }));
  }

  return new Response(JSON.stringify({ code: 200, message: "Success" }));
}
