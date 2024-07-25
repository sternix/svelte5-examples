<script>
    // https://svelte.dev/repl/162005fa12cc4feb9f668e09260595a7?version=3.24.1
    let top = 50;
    let left = 50;
    // up = keyCode:38, key:ArrowUp
    // down = keyCode:40, key:ArrowDown
    // right = keyCode:39, key:ArrowRight
    // left = keyCode:37, key:ArrowLeft

    /* keyCode'lu hali
    function onKeyDown(e) {
        e.preventDefault();
        switch (e.keyCode) {
            case 38:
                top -= 50;
                break;
            case 40:
                top += 50;
                break;
            case 37:
                left -= 50;
                break;
            case 39:
                left += 50;
                break;
        }
    }
    */

    // key'li hali
    function onKeyDown(e) {
        e.preventDefault();
        switch (e.key) {
            case "ArrowUp":
                top -= 50;
                break;
            case "ArrowDown":
                top += 50;
                break;
            case "ArrowLeft":
                left -= 50;
                break;
            case "ArrowRight":
                left += 50;
                break;
        }
    }
</script>

<main>
    <div style="left: {left}px; top: {top}px"></div>
</main>

<svelte:window onkeydown={onKeyDown} />

<style>
    main {
        width: 500px;
        height: 500px;
        border: solid blue 1px;
        margin: 10px auto;
        position: relative;
    }
    div {
        width: 50px;
        height: 50px;
        background-color: green;
        position: absolute;
    }
</style>
