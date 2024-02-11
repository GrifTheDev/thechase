import { readDocData } from "$lib/server/database.js";
//import { json } from "@sveltejs/kit" return json(a+b)

/** @type {import('./$types').RequestHandler} */
export async function GET({}) {
    const testData = await readDocData("gameIDs", "hziydQCTfw7b")
    console.log(testData)
    return new Response(JSON.stringify({data: testData}))
} 
