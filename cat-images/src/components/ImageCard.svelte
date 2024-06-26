<script>
    import { store } from "@/state/store.svelte.js";
    import { placeholderImgUrl } from "@/constants/api";
    import { onMount } from "svelte";

    let { index } = $props();

    let catInfo = $state();
    let loaded = $state(false);

    onMount(() => {
        catInfo = store.images[index] || null;
    });
</script>

<div class="img-swap-container">
    <img
        src={placeholderImgUrl}
        alt="placeholder"
        class={loaded ? "placeholder-image" : "cat-image"}
    />

    <img
        class={loaded ? "cat-image" : "placeholder-image"}
        src={catInfo?.url}
        alt="cat"
        onload={() => (loaded = true)}
    />
</div>

<style>
    .cat-image {
        object-fit: cover;
        max-height: 200px;
        width: 100%;
        transition: max-height 0.5s ease-out;
    }

    .img-swap-container {
        height: 200px;
        width: 300px;
        overflow: hidden;
    }

    .placeholder-image {
        max-height: 0;
    }
</style>
