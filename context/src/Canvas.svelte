<script>
	import { flushSync, setContext, tick } from "svelte";

	let { width = 100, height = 100, children } = $props();

	let canvas, ctx;
	let items = new Set();
	let scheduled = false;

	$effect(() => {
		ctx = canvas.getContext("2d");
	});

	setContext("canvas", { addItem });

	function addItem(fn) {
		$effect(() => {
			items.add(fn);
			return () => items.delete(fn);
		});

		$effect(() => {
				if (scheduled)
					return;
				scheduled = true;
				// burası olmazsa
				// Cannot read properties of undefined (reading 'clearRect')
				// hatası veriyor
				tick().then(() => {
					draw();
					scheduled = false;
				})
		});
	}

	function draw() {
		ctx.clearRect(0, 0, width, height);
		items.forEach(fn => fn(ctx));
	}
</script>

<canvas bind:this={canvas} {width} {height}>
	{@render children?.()}
</canvas>

<style>
	canvas {
		width: 100%;
		height: 100%;
	}
</style>
