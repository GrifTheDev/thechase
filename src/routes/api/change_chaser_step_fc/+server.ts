import { questionList } from "$lib/assets/questions";
import { log } from "$lib/logger";
import { readDocData, updateDocData } from "$lib/database.js";
import { PUBLIC_GAMEID } from "$env/static/public";
import type { RequestHandler } from "./$types";
//import { json } from "@sveltejs/kit" return json(a+b)

export const POST: RequestHandler = async ({ request }) => {
  const { newSteps } = await request.json();
  const currentData = await readDocData("gameIDs", PUBLIC_GAMEID);
  // @ts-ignore
  const { finalChsrSteps, finalCSteps } = currentData;
  if (finalCSteps == (finalChsrSteps) + 1) {
    await updateDocData("gameIDs", PUBLIC_GAMEID, {
        finalChsrSteps: finalChsrSteps + newSteps,
        chaserVictory: true
      });
  } else {
    await updateDocData("gameIDs", PUBLIC_GAMEID, {
        finalChsrSteps: finalChsrSteps + newSteps,
      });
  }

  

  return new Response(JSON.stringify({ code: 200, message: "Success" }));
};
