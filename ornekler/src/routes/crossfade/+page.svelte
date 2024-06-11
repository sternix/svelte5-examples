<script>
    // https://github.com/sveltejs/svelte/issues/11372#issuecomment-2101608334
    // örneğinden uyarlandı

    import Box from "./Box.svelte";
    import { crossfade } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    let current = 1;

    const [send, receive] = crossfade({
        duration: 500,
        easing: cubicOut,
    });
</script>

<div class="btn-row">
    {#each [1, 2, 3] as num}
        <Box
            index={num}
            selected={num === current}
            onclick={() => (current = num)}
            {send}
            {receive}
        ></Box>
    {/each}
</div>

<style>
    .btn-row {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
    }
</style>
