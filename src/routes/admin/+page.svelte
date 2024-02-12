<script>
    // @ts-nocheck
    import { gameState } from "$lib/stores"
    let response, firstGroupName, secondGroupName, thirdGroupName

     async function startGameRequest () {
        const res = await fetch('/api/init_game', {
            method: 'POST',
            body: JSON.stringify({
                firstGroupName: firstGroupName,
                secondGroupName: secondGroupName,
                thirdGroupName: thirdGroupName
            })
        })

        response = await res.json()
    } 

    
</script>

{#if Number($gameState) === -1}
    <div class="flex flex-col items-center">

        <h1 class="text-3xl text-center w-96">
            Game not started. Start it using the button below.
        </h1>

        <h2>First group name:</h2>
        <input
            name="id"
            bind:value={firstGroupName}
            autocomplete="off"
            required
            class="border-2 rounded-md border-black m-1"
        /> <br />
        <h2>Second group name:</h2>
        <input
            name="id"
            bind:value={secondGroupName}
            autocomplete="off"
            required
            class="border-2 rounded-md border-black m-1"
        /> <br />
        <h2>Third group name:</h2>
        <input
            name="id"
            bind:value={thirdGroupName}
            autocomplete="off"
            required
            class="border-2 rounded-md border-black m-1"
        /> <br />

        <button class="border border-black rounded-md p-1" on:click={startGameRequest}
            >Start Game</button
        >

        {#if response?.err_code}
            {response.err_info}
        {/if}
    </div>
{:else}
    <p>Full dashboard</p>
{/if}

