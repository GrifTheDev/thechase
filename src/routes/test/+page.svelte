<script lang="ts">
    import { gameState } from "$lib/stores";

    
    let thingy = $gameState
    
    async function testa() {

        gameState.update(n => n+1)
    }

</script> 

{$gameState}
<button on:click={testa}>Click me</button>
<button on:click={() => { $gameState = -1 }}>Reset</button>
