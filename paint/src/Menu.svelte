<script>
    import "./style.css";
    let { lineWidth, lineColor, lineOpacity } = $props();
</script>

<div class="Menu">
    <label for="line_color">Brush Color </label>
    <input id="line_color" type="color" bind:value={lineColor.value} />
    <label for="brush_width">Brush Width</label>
    <input
        id="brush_width"
        type="range"
        min="3"
        max="20"
        bind:value={lineWidth.value}
    />
    <label for="line_opacity">Brush Opacity</label>
    <input
        id="line_opacity"
        type="range"
        min="1"
        max="100"
        bind:value={lineOpacity.value}
    />
</div>
