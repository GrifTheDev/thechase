<script lang="ts">
    import chaser_arrow from "$lib/assets/chaser_arrow.png";
    import { onMount } from "svelte";
    import { gameState } from "$lib/stores";

    let gameId: string;
    let apiRes: { err_code: number; err_info: string } | undefined;
    let loading = false
    async function sendIDAPI() {
        loading = true
        const res = await fetch("/api/start_game", {
            method: "POST",
            body: JSON.stringify({ gameId: gameId }),
        });

        apiRes = await res.json();
        loading = false
    }
</script>

{#if Number($gameState) === -1}
    <div class="flex flex-col items-center text-center">
        <h1 class="text-3xl text-center w-96">
            Start the game by entering the game ID generated from the <a
                href="/admin"
                class="text-blue-500">admin</a
            > panel.
        </h1>
        Enter game ID:<br />
        <input
            name="id"
            bind:value={gameId}
            autocomplete="off"
            required
            class="border-2 rounded-md border-black"
        /> <br />
        <button
            type="submit"
            class="border border-black p-2 mt-2 rounded-lg"
            on:click={sendIDAPI}>Submit</button
        >
    

    {#if apiRes?.err_code !== undefined}
        <p>{apiRes.err_info}</p>
    {/if}

    {#if loading}
        <p>Loading...</p>
    {/if}
    </div>
{:else}
    <div class="flex flex-col h-screen items-center justify-center">
        <div
            class="border-2 border-solid border-black w-96 h-32 rounded-md bg-board-chaser"
        ></div>

        <div
            class="border-2 border-solid border-black w-96 h-32 rounded-md bg-board-chaser"
        >
            <img alt="A chaser arrow" src={chaser_arrow} class="" />
        </div>

        <div
            class="border-2 border-solid border-black w-96 h-32 rounded-md bg-board-contestant"
        ></div>

        <div
            class="border-2 border-solid border-black w-96 h-32 rounded-md bg-board-empty"
        ></div>

        <div
            class="border-2 border-solid border-black w-96 h-32 rounded-md bg-board-empty"
        ></div>

        <div
            class="border-2 border-solid border-black w-96 h-32 rounded-md bg-board-empty"
        ></div>

        <div
            class="border-2 border-solid border-black w-96 h-32 rounded-md bg-board-empty"
        ></div>
    </div>
{/if}
