<script>
    let { show, handleClick } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    class="scroll-top"
    onclick={handleClick}
    style:--opacity={show ? 1 : 0}
    style:--cursor={show ? "pointer" : "default"}
>
    Top
</div>

<style>
    .scroll-top {
        background-color: rgba(0, 0, 0, 0.2);
        width: 50px;
        height: 50px;
        position: fixed;
        right: 15px;
        bottom: 15px;
        border-radius: 50%;
        color: white;
        line-height: 47px;
        text-align: center;
        transition: opacity 0.5s;
        opacity: var(--opacity);
        cursor: var(--cursor);
    }
</style>
