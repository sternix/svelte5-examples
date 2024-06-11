<script>
    let { index, onclick, selected, send, receive } = $props();

    const key = "indicator";
</script>

<div class="parent">
    <button {onclick}>{index}</button>
    {#if selected}
        <div class="background" in:receive={key} out:send={key}></div>
    {/if}
</div>

<style>
    button {
        height: 50px;
        background-color: #2b2a33;
    }

    .background {
        background-color: red;
        height: 8px;
        width: 70px;
        margin: 0 auto;
    }

    .parent {
        margin-top: 10px;
        display: grid;
        height: 70px;
        border: 1px;
        color: white;
    }
</style>
