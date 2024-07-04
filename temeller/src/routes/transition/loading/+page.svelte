<script>
    import { onMount } from "svelte";
    import { typewriter } from "./typewriter";
    import messages from "./messages";

    let i = $state(-1);

    onMount(() => {
        const interval = setInterval(() => {
            i += 1;
            i %= messages.length;
        }, 4000);

        return () => {
            clearInterval(interval);
        };
    });
</script>

<h1>loading...</h1>

{#key i}
    <p in:typewriter={{ speed: 2 }}>
        {messages[i] || ""}
    </p>
{/key}
