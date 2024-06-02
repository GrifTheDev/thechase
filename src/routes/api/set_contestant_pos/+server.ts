import { log } from "$lib/logger";
import { readDocData, updateDocData } from "$lib/database.js";
import { PUBLIC_GAMEID } from "$env/static/public";
import type { RequestHandler } from "./$types";
//import { json } from "@sveltejs/kit" return json(a+b)

/* export async function POST({ request }) {
  let { newPosition } = await request.json();
  await updateDocData("gameIDs", PUBLIC_GAMEID, {countContestant: newPosition})

  return new Response(JSON.stringify({ code: 200, message: "Success" }));
}
 */

export const POST: RequestHandler = async({ request }) => {
  let { newPosition } = await request.json();
  await updateDocData("gameIDs", PUBLIC_GAMEID, {countContestant: newPosition})

  return new Response(JSON.stringify({ code: 200, message: "Success" }));
}
