<!-- https://learn.svelte.dev/tutorial/component-bindings -->
<script>
    import Keypad from "./Keypad.svelte";

    let pin = $state("");
    let view = $derived(pin ? pin.replace(/\d(?!$)/g, "•") : "enter your pin");

    function handleSubmit() {
        alert(`submitted ${pin}`);
    }
</script>

<h1 style="opacity: {pin ? 1 : 0.4}">
    {view}
</h1>

<Keypad bind:value={pin} submit={handleSubmit} />
