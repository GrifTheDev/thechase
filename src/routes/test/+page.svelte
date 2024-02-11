<script lang="ts">
    import { gameState } from "$lib/stores";


</script>

<button on:click={() => { $gameState += 1 }}>Click me</button>
{$gameState}