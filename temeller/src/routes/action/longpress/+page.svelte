<script>
    // https://svelte.dev/examples/adding-parameters-to-actions
    import longpress from "./longpress";

    let pressed = false;
    let duration = 2000;
</script>

<label>
    <input type="range" bind:value={duration} max="2000" step="100" />
    {duration}ms
</label>

<!--
diğer taraftaki CustomEvent 
node.dispatchEvent(new CustomEvent('longpress'))
olarak yollandı,
bu tarafta onlongpress olarak tanımlandı
yani tanımladığımız event'e on ekleyerek kullanabiliyoruz
-->

<button
    use:longpress={duration}
    onlongpress={() => (pressed = true) }
    onmouseenter={() => (pressed = false)}
>
press and hold
</button>

{#if pressed}
    <p>Tebrikler {duration} kadar butona basılı tutabildiniz</p>
{/if}
