<!-- https://learn.svelte.dev/tutorial/in-and-out -->
<script>
    import { fade, fly } from "svelte/transition";
    let visible = $state(true);
</script>

<label>
    <input type="checkbox" bind:checked={visible} />
    visible
</label>

<!--
visible olduğunda yani in'de fly
visible false yani görünmez olduğunda yani out'da fade
-->
{#if visible}
    <p in:fly={{ y: 200, duration: 2000 }} out:fade>Flies in, fades out</p>
{/if}
