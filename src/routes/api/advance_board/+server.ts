import { questionList } from "$lib/assets/questions";
import { log } from "$lib/logger";
import { readDocData, updateDocData } from "$lib/database.js";
import { PUBLIC_GAMEID, PUBLIC_MAX_BOARD_LEN } from "$env/static/public";
import type { RequestHandler } from "./$types";
//import { json } from "@sveltejs/kit" return json(a+b)

export const POST: RequestHandler = async ({ request }) => {
  const { auth, questionState } = await request.json();

  if (auth != "this123is123a123password")
    return new Response(JSON.stringify({ code: 403, message: "Forbidden" }));
  // contestant
  if (questionState == 3) {
    const currentData = await readDocData("gameIDs", PUBLIC_GAMEID);
    // @ts-ignore
    const { contestantAnswerValue, currentQuestion, countContestant } =
      currentData;
    const correctAnswerV = currentQuestion.correctAnswer;
    if (correctAnswerV == contestantAnswerValue) {

      if (countContestant + 1 > PUBLIC_MAX_BOARD_LEN) {
        await updateDocData("gameIDs", PUBLIC_GAMEID, {
            contestantVictory: true,
          });
      } else {
        await updateDocData("gameIDs", PUBLIC_GAMEID, {
            countContestant: countContestant + 1,
          });
      }

      
      return new Response(JSON.stringify({ code: 200, message: "Success" }));
    }
  } else if (questionState == 4) {
    const currentData = await readDocData("gameIDs", PUBLIC_GAMEID);
    // @ts-ignore
    const { chaserAnswerValue, currentQuestion, countChaser, countContestant } =
      currentData;
    const correctAnswerV = currentQuestion.correctAnswer;
    if (correctAnswerV == chaserAnswerValue) {
        if (countChaser + 1 == countContestant) {
            await updateDocData("gameIDs", PUBLIC_GAMEID, {
                chaserVictory: true,
                countChaser: countChaser + 1
              });
          } else {
            await updateDocData("gameIDs", PUBLIC_GAMEID, {
                countChaser: countChaser + 1,
              });
          }
      return new Response(JSON.stringify({ code: 200, message: "Success" }));
    }
  }


  return new Response(JSON.stringify({ code: 200, message: "Success" }));
};
