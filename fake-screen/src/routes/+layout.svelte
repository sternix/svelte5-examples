<script>
    import CloseButton from "../components/CloseButton.svelte";
    import './app.css'

    let { children } = $props();
</script>

<CloseButton />
{@render children() }