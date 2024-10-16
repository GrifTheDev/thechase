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
  const { finalCSteps } = currentData;

  await updateDocData("gameIDs", PUBLIC_GAMEID, {
    finalCSteps: finalCSteps + newSteps,
  });

  return new Response(JSON.stringify({ code: 200, message: "Success" }));
};
