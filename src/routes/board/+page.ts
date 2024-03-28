/* import { doc, onSnapshot } from "@firebase/firestore";
import { getDB } from "$lib/firebase";

/** @type {import('./$types').PageLoad} 
export function load({ fetch }) {
  let gameState = -1;
  const { db } = getDB();
  const sub = onSnapshot(doc(db, "gameIDs", "hziydQCTfw7b"), (doc1) => {
    console.log(doc1.data());
    gameState = doc1.data()!.gameState
    console.log(gameState)
  });

  return {gameState:gameState}
} */