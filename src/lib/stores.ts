import { persisted } from "svelte-persisted-store";

export const gameState = persisted("gameState", -1)