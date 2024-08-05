<script context="module">
    let current = $state();
</script>

<script>
    let { src, title, composer, performer } = $props();

    let audio;
    let paused = $state(true);

    function stopOthers() {
        if (current && current != audio) current.pause();

        current = audio;
    }
</script>

<article class:playing={!paused}>
    <h2>{title}</h2>
    <p><strong>{composer}</strong> / performed by {performer}</p>

    <audio bind:this={audio} bind:paused onplay={stopOthers} controls {src}
    ></audio>
</article>

<style>
    article {
        margin: 0 0 1em 0;
        max-width: 800px;
    }

    h2,
    p {
        margin: 0 0 0.3 0;
    }

    audio {
        width: 100%;
        margin: 0.5em 0 1em 0;
    }

    .playing {
        color: #ff3e00;
    }
</style>
