<script>
	import Menu from "./Menu.svelte";
	import { extractOffSetFromEvent } from "./utils";

	let canvas;
	let ctx;
	let isDrawing = $state(false);
	const scalingFactor = 1;
	let lineWidth = $state(5);
	let lineColor = $state("#000000");
	let lineOpacity = $state(50);
	let opacity = $derived(lineOpacity / 100);

	$effect(() => {
		ctx = canvas.getContext("2d");
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		ctx.globalAlpha = opacity;
		ctx.strokeStyle = lineColor;
		ctx.lineWidth = lineWidth;
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
		<!--
			buradaki color ve width component'teki $bindable değerler
			eğer iki tarafta aynı değer varsa lineOpacity gibi yazabiliriz
			bu şekilde childdaki bir değişiklik yukarıya iletilebiliyor
		 -->
		<Menu bind:color={lineColor} bind:width={lineWidth} bind:lineOpacity />
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
