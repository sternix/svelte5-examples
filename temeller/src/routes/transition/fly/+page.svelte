<!-- https://learn.svelte.dev/tutorial/adding-parameters-to-transitions  -->
<script>
    import { fly } from "svelte/transition";
    let visible = $state(true);
</script>

<label>
    <input type="checkbox" bind:checked={visible} />
    visible
</label>

{#if visible}
    <p transition:fly={{ y: 200, duration: 2000 }}>Flies in and out</p>
{/if}
