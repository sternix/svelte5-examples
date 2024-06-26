<script>
    import { fetchCats } from "@/helpers/fetcher";
    import { store } from "@/state/store.svelte.js";
    import ImageCard from "./ImageCard.svelte";
    import Loader from "./Loader.svelte";
    import { onMount } from "svelte";

    let bottomSection;

    onMount(async () => {
        const cats = await fetchCats();
        store.images = cats || [];
        setupObserver();
    });

    async function loadMoreHandler() {
        const cats = await fetchCats();
        if (!cats) return;
        store.images = [...store.images, ...cats];
    }

    function setupObserver() {
        const observer = new IntersectionObserver(loadMoreHandler);
        observer.observe(bottomSection);
    }
</script>

<div class="container">
    {#each Array(store.count) as _, i (i)}
        <ImageCard index={i} />
    {/each}
</div>

<div class="bottom-section" bind:this={bottomSection}>
    <Loader />
</div>

<style>
    .container {
        display: grid;
        grid-template-columns: repeat(auto-fill, 300px);
        gap: 40px;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .bottom-section {
        height: 100px;
    }
</style>
