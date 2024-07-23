<script>
    let {children, visible = true, opacity=1, dark = false, xPos, yPos} = $props();    

    function getColor() {
        return dark ? 'white' : 'rgb(22, 22, 22)';
    }

    let boxStyle = $derived(`left: ${xPos}px; top: ${yPos}px`);
</script>

<!--
aslında opacity değerini
opacity: var(--opacity,1)
olarak'ta yazabiliriz, farklı kullanım şekillerini denemek istedim
-->

<!-- buradaki opacity değeri prop yerine hesaplanan bir değer olabilir -->
<div
    style:visibility={ visible ? "visible" : "hidden"}
    style:--opacity={opacity}
    style:--color={getColor()}
    style={boxStyle}>
        {@render children() }
</div>

<!--
<div style:color={color}></div>
<div style:color></div>

-->

<style>
    div {
        position: var(--position,inherit);
        display: inline-block;
        border-style: solid;
        opacity: var(--opacity);
        border-width: 1px;
        width: 100px;
        height: 100px;
        color: var(--color);
        background-color: var(--bg-color,green); /* varsayılan değer olarak yeşil verdik */
    } 
</style>