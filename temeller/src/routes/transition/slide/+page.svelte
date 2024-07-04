<!-- https://learn.svelte.dev/tutorial/global-transitions -->
<script>
    import { slide } from "svelte/transition";

    let showItems = $state(true);
    let current = $state(5);
    let items = [
        "bir",
        "iki",
        "üç",
        "dört",
        "beş",
        "altı",
        "yedi",
        "sekiz",
        "dokuz",
        "on",
    ];
</script>

<label>
    <input type="checkbox" bind:checked={showItems} />
    listeyi göster
</label>

<label>
    <input type="range" bind:value={current} max="10" />
</label>

{#if showItems}
    {#each items.slice(0, current) as item}
        <!--
        global olmazsa her item eklenmesi silinmesinde sorun yok
        fakat range'i 10'a al ve listeyi gösteri iki defa tıklayınca farkı görebiliriz,
        -->
        <div transition:slide|global>
            {item}
        </div>
    {/each}
{/if}

<style>
    div {
        padding: 0.5em 0;
        border-top: 1px solid #eee;
    }
</style>
