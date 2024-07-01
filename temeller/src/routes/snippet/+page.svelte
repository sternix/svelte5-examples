<script>
    import Comp from './Comp.svelte';
</script>

{#snippet ilk()}
    <p>Ben ilk snippet'im</p>
{/snippet}

{@render ilk()}

{#snippet iki(name)}
    <p>Ben ikici snippet'im adım {name}</p>
{/snippet}

{@render iki('Test')}

<Comp snip={iki} />