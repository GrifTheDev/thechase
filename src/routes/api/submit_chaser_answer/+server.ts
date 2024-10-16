import { log } from "$lib/logger";
import { readDocData, updateDocData } from "$lib/database.js";
import { PUBLIC_GAMEID } from "$env/static/public";
import type { RequestHandler } from "./$types";
//import { json } from "@sveltejs/kit" return json(a+b)

export const POST: RequestHandler = async ({ request }) => {
  const { chaserAnswerV } = await request.json();

  await updateDocData("gameIDs", PUBLIC_GAMEID, {
    chaserAnswerValue: chaserAnswerV,
    chaserAnswer: true
  });
  return new Response(JSON.stringify({ code: 200, message: "Success" }));
};
