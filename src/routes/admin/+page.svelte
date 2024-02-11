<script>
    // @ts-nocheck
    import conf from "$lib/config.json";
    let thingy
     async function startGame () {
        const res = await fetch('/api/init_game', {
            method: 'GET'
        })

        thingy = await res.json()
    } 

    
</script>

{#if Number(conf.gameState) === 0}
    <h1 class="text-3xl text-center">
        Game not started. Start it using the button below.
    </h1>
    <div class="flex flex-col items-center">
        <button class="border border-black p-1" on:click={startGame}
            >Start Game</button
        >
    </div>
{:else}
    <p>Full dashboard</p>
{/if}

