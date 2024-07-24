<script>
    import View from "./View.svelte";

    function getRandomTime() {
        return Math.random() * 5000 + 5000;
    }

    let { randomFn = getRandomTime } = $props();

    let progress = $state(0);

    $effect(() => {
        let timer = setInterval(() => {
            progress += 1;
        }, randomFn());

        return () => {
            clearInterval(timer);
        };
    });
</script>

<View {progress} />
