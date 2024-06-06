<script>
	import { onMount, onDestroy } from 'svelte';

	let { page, onmeasure } = $props();

	let canvas;
	let width = $state();
	let height = $state();

	function measure() {
		onmeasure({
			scale: canvas.clientWidth / width
		});
	}

	async function render() {
		const _page = await page;
		const context = canvas.getContext('2d');
		const viewport = _page.getViewport({ scale: 1, rotation: 0 });
		width = viewport.width;
		height = viewport.height;
		await _page.render({
			canvasContext: context,
			viewport
		}).promise;
		measure();
		window.addEventListener('resize', measure);
	}

	onMount(render);

	onDestroy(() => {
		window.removeEventListener('resize', measure);
	});
</script>

<div>
	<canvas bind:this={canvas} class="max-w-full" style="width: {width}px;" {width} {height}></canvas>
</div>
