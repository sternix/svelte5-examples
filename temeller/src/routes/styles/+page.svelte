<script>
    import Box from "./Box.svelte";
</script>

<div style="margin-bottom: 30px;">
    <a href="https://geoffrich.net/posts/style-directives/">https://geoffrich.net/posts/style-directives/</a>
</div>

<Box --bg-color="red">
    Deneme
</Box>

<Box>
    Deneme2
</Box>

<!-- bu görülmüyor -->
<Box visible={false}>
    Deneme3
</Box>

<Box opacity="0.5">
    Deneme4
</Box>

<!-- yazı rengi değişti -->
<Box dark={true}>
    Deneme5
</Box>

<!-- absolute pos verebiliyoruz -->
<Box xPos="450" yPos="300" --position="absolute">
    Deneme6
</Box>




