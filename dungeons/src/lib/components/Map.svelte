<script>
    let { mazeDir } = $props();
</script>

<div class="map">
    {#each mazeDir as dir}
        <div
            class="block"
            style:border-top-color={dir[0] ? "transparent" : "white"}
            style:border-bottom-color={dir[1] ? "transparent" : "white"}
            style:border-left-color={dir[2] ? "transparent" : "white"}
            style:border-right-color={dir[3] ? "transparent" : "white"}
        ></div>
    {/each}
</div>

<style>
    .map {
        display: grid;
        grid-template-columns: repeat(16, 50px);
        grid-template-rows: repeat(16, 50px);
        position: relative;
        z-index: 2;
        border: 1px solid white;
    }
    .block {
        border-width: 1px;
        border-style: solid;
    }
</style>
