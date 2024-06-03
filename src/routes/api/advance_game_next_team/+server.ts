import { questionList } from "$lib/assets/questions";
import { log } from "$lib/logger";
import { readDocData, updateDocData } from "$lib/database.js";
import { PUBLIC_GAMEID } from "$env/static/public";
import type { RequestHandler } from "./$types";
//import { json } from "@sveltejs/kit" return json(a+b)

export const POST: RequestHandler = async({ request }) => {
    const { auth } = await request.json();

    if (auth != "this123is123a123password") return new Response(JSON.stringify({ code: 403, message: "Forbidden" }))
    const currentData = await readDocData("gameIDs", PUBLIC_GAMEID);
    // @ts-ignore
    const { gameState } =
      currentData

  await updateDocData("gameIDs", PUBLIC_GAMEID, {
    chaserAnswer: false,
    contestantAnswer: false,
    chaserVictory: false,
    contestantVictory: false,
    countChaser: 0,
    countContestant: 2,
    gameState: gameState + 1,
    timerRun: false,
    questionSlidOut: false,
    questionState: 0
  });

  return new Response(JSON.stringify({ code: 200, message: "Success" }));
}
