<script>
    let {a,b,c = 'VARSAYILAN', ...rest} = $props();

    $inspect(a,b,c);
</script>

<p>A: {a}</p>
<p>B: {b}</p>
<p>C: {c}</p>
Rest: <pre>{JSON.stringify(rest,null,2)}</pre>
