import { questionList } from "$lib/assets/questions";
import { log } from "$lib/logger";
import { readDocData, updateDocData } from "$lib/database.js";
import { PUBLIC_GAMEID } from "$env/static/public";
import type { RequestHandler } from "./$types";
//import { json } from "@sveltejs/kit" return json(a+b)

export const POST: RequestHandler = async({ request }) => {
    const { auth } = await request.json();
    if (auth != "this123is123a123password") return new Response(JSON.stringify({ code: 403, message: "Forbidden" }))
        
  await updateDocData("gameIDs", PUBLIC_GAMEID, {
    gameState: 4,
    finalChaseTComplete: false
  });

  return new Response(JSON.stringify({ code: 200, message: "Success" }));
}
