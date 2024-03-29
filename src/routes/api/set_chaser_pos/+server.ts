import { log } from "$lib/logger";
import { readDocData, updateDocData } from "$lib/database.js";
import { PUBLIC_GAMEID } from "$env/static/public";
//import { json } from "@sveltejs/kit" return json(a+b)

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  let { newPosition } = await request.json();
  await updateDocData("gameIDs", PUBLIC_GAMEID, {countChaser: newPosition})

  return new Response(JSON.stringify({ code: 200, message: "Success" }));
}
