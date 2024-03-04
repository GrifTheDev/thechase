<script lang="ts">
    import { getDB } from "$lib/firebase";
    import { gameState } from "$lib/stores";
    import { doc, onSnapshot } from "@firebase/firestore";
    const { db } = getDB()
    let thingy = ""
    const sub = onSnapshot(doc(db, "gameIDs", "hziydQCTfw7b"), (doc1) => {
        console.log(doc1.data())
    } )
    
    
    
    async function testa() {

        gameState.update(n => n+1)
    }

</script> 

{thingy}
<button on:click={testa}>Click me</button>
<button on:click={() => { $gameState = -1 }}>Reset</button>
