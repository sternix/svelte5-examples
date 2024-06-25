<script>
	let { children } = $props();
</script>

<svelte:head>
	<link href="https://unpkg.com/nes.css@latest/css/nes.min.css" rel="stylesheet" />

	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
</svelte:head>

{@render children?.()}
