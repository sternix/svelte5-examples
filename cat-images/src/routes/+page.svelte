<script>
    import ImageContainer from "@/components/ImageContainer.svelte";
</script>

<header>Discover the cuttes cats</header>

<ImageContainer />

<style>
    header {
        text-align: center;
        background-color: #aa8749;
        color: white;
        font-style: italic;
        padding: 30px;
        height: 30px;
        font-size: 1.5rem;
    }

    :global(body) {
        margin: 0;
        background-color: #aa874955;
    }
</style>
