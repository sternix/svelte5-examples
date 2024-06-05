<script>
	let { children } = $props();
	let portal = $state();
	//$: portal && document.body.appendChild(portal);

	$effect(() => {
		document.body.appendChild(portal);
	});
</script>

<div bind:this={portal}>
	{@render children()}
</div>
