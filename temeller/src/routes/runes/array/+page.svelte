<script>
    import { base} from "$app/paths";

    let purchase = $state(0);
    let purchases = $state([22, 30, 12, 25, 47]);

    $inspect(purchases);

    /*
        Where type can be either "init" or "update" - which we discussed before as it logs with the default behavior.
        ????(Emin değilim sanki value gibi geldi) And the count callback argument is the amount of times it has been triggered in its lifecycle.
    */
    $inspect(purchase).with( (type,count) => {
        console.log(`$inspect-with: type: ${type}, count: ${count}`);

        // break point koyup bekliyor
        //debugger
    })

</script>

<nav>
    <ul>
        <li><a href="{base}/">Anasayfa</a></li>
        <li><a href="{base}/runes">Runes</a></li>
    </ul>
</nav>

<input type="number" bind:value={purchase} />

<button onclick={() => purchases.push(purchase)}>Add purchase</button>
<button onclick={() => purchases.pop()}>Refund last purchase</button>

<p>
    Total: ${purchases.join(" + $") || 0} = ${purchases.reduce(
        (a, b) => a + b,
        0,
    )}
</p>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    ul {
        list-style: none;
        margin: 10px 0px 10px 0px;
    }

    li {
        display: inline;
        margin-left: 10px;
    }
</style>
