<script>
	import Menu from "./Menu.svelte";
	import { extractOffSetFromEvent } from "./utils";
	import { LineOpacity, useState } from "./states.svelte";

	let canvas;
	let ctx;
	let isDrawing = $state(false);
	const scalingFactor = 1;
	const lineWidth = useState(5);
	const lineColor = useState("#000000");
	const lineOpacity = LineOpacity(50);

	$effect(() => {
		ctx = canvas.getContext("2d");
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		ctx.globalAlpha = lineOpacity.opacity;
		ctx.strokeStyle = lineColor.value;
		ctx.lineWidth = lineWidth.value;
	});

	function startDrawing(e) {
		const { offsetX, offsetY } = extractOffSetFromEvent(
			e,
			scalingFactor,
			canvas,
		);

		ctx.beginPath();
		ctx.moveTo(offsetX, offsetY);
		isDrawing = true;
	}

	function endDrawing() {
		ctx.closePath();
		isDrawing = false;
	}

	function draw(e) {
		if (!isDrawing) {
			return;
		}

		const { offsetX, offsetY } = extractOffSetFromEvent(
			e,
			scalingFactor,
			canvas,
		);

		ctx.lineTo(offsetX, offsetY);
		ctx.stroke();
	}
</script>

<div class="App">
	<h1>Svelte Paint App</h1>
	<div class="draw-area">
		<Menu {lineColor} {lineWidth} {lineOpacity} />
		<canvas
			bind:this={canvas}
			onmousedown={startDrawing}
			onmouseup={endDrawing}
			onmousemove={draw}
			ontouchstart={startDrawing}
			ontouchend={endDrawing}
			ontouchmove={draw}
			width="1280px"
			height="720px"
		></canvas>
	</div>
</div>
