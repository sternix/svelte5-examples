<!-- svelte-ignore state_referenced_locally -->
<script>
    import digit0 from "$assets/digit0.png";
    import digit1 from "$assets/digit1.png";
    import digit2 from "$assets/digit2.png";
    import digit3 from "$assets/digit3.png";
    import digit4 from "$assets/digit4.png";
    import digit5 from "$assets/digit5.png";
    import digit6 from "$assets/digit6.png";
    import digit7 from "$assets/digit7.png";
    import digit8 from "$assets/digit8.png";
    import digit9 from "$assets/digit9.png";
    import digit_ from "$assets/digit-.png";

    let { number = $bindable() } = $props();

    const digits = [
        digit0,
        digit1,
        digit2,
        digit3,
        digit4,
        digit5,
        digit6,
        digit7,
        digit8,
        digit9,
    ];

    /*
    $inspect(number).with((_t,v) => {
      console.log("digit.number",v);
    });
    */

    let numberStr = $derived.by(() => {
        let ns;
        if (number < 0) {
            const _number = -number % 100;
            if (_number === 0) {
                ns = "00";
            } else if (_number < 10) {
                ns = "0" + _number;
            } else {
                ns = String(_number);
            }
        } else {
            ns = number < 999 ? String(number) : "999";
            if (number < 10) ns = "00" + ns;
            else if (number < 100) ns = "0" + ns;
        }

        return ns;
    });
</script>

{#if number < 0}
    <img src={digit_} alt="-" />
{/if}

{#each numberStr.split("") as n, i (i)}
    <img src={digits[n]} alt={n} />
{/each}
