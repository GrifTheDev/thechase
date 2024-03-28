/* import type { Handle } from "@sveltejs/kit";

export const handle = (async ({ event, resolve }) => {
  const cookie = event.cookies.get("GameState");
  event.locals.gameState = cookie
  

  return await resolve(event);
}) satisfies Handle; */