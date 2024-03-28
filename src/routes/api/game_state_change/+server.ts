import { log } from "$lib/logger";
import { readDocData, updateDocData } from "$lib/database.js";
import { PUBLIC_GAMEID } from "$env/static/public";
//import { json } from "@sveltejs/kit" return json(a+b)

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  let { gameState } = await request.json();
  gameState = Number(gameState);
  await updateDocData("gameIDs", PUBLIC_GAMEID, {gameState: gameState})

  return new Response(JSON.stringify({ data: "1" }));
}
