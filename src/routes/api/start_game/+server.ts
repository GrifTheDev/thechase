import { log } from "$lib/logger.js";
import { readDocData } from "$lib/server/database.js";
//import { json } from "@sveltejs/kit" return json(a+b)

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, route }) {
    const { gameId } = await request.json()
    log({message: `gameId - ${gameId}`, level: 0, apiRoute: route.id})
    if (gameId == undefined) return new Response(JSON.stringify({err_code: 400, err_info: "Please provide a game ID."}))

    const data = await readDocData("gameIDs", gameId)
    
    if (data == undefined) return new Response(JSON.stringify({ err_code: 404, err_info: "The requested game ID does not exist. Have you started the game in the admin panel?" }))
    // cookie
    return new Response("1")
} 
