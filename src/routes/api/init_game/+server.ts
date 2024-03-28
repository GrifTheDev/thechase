import { log } from "$lib/logger";
import { readDocData } from "$lib/database.js";
//import { json } from "@sveltejs/kit" return json(a+b)

/** @type {import('./$types').RequestHandler} */
export async function POST({request}) {
    /* const testData = await readDocData("gameIDs", "hziydQCTfw7b")
    console.log(testData) */
   /*  const { firstGroupName, secondGroupName, thirdGroupName } = await request.json()
    log({message: `${firstGroupName}, ${secondGroupName}, ${thirdGroupName}`, level: 0})
    if (firstGroupName == undefined || secondGroupName == undefined || thirdGroupName == undefined) return new Response(JSON.stringify({err_code: 400, err_info: "Please provide all three group names."})) */

    return new Response(JSON.stringify({data: "1"}))
} 
