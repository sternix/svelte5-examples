<script>
	let { children } = $props();
	let portal;
	//$: portal && document.body.appendChild(portal);

	$effect(() => {
		if (portal)
			document.body.appendChild(portal);
	});
</script>

<div bind:this={portal}>
	{@render children()}
</div>
