<script>
    import { getContext } from "svelte";

    let { x, y, size, rotate } = $props();

    $effect(() => {
        getContext("canvas").addItem(draw);
    });

    function draw(ctx) {
        $effect(() => {
            ctx.save();

            ctx.translate(x, y);
            ctx.rotate(rotate);

            ctx.strokeStyle = "black";
            ctx.strokeRect(-size / 2, -size / 2, size, size);

            ctx.restore();
        });
    }
</script>
