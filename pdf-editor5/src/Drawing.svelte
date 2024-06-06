<script>
	import { onMount } from 'svelte';
	import { pannable } from './utils/pannable.js';

	let { originWidth, originHeight, width, x, y, pageScale = 1, path, onupdate, ondelete } = $props();

	let startX;
	let startY;
	let svg;
	let operation = $state('');
	let dx = $state(0);
	let dy = $state(0);
	let dw = $state(0);
	let direction = '';

	const ratio = originWidth / originHeight;

	async function render() {
		svg.setAttribute('viewBox', `0 0 ${originWidth} ${originHeight}`);
	}

	function handlePanMove(event) {
		const _dx = (event.detail.x - startX) / pageScale;
		const _dy = (event.detail.y - startY) / pageScale;
		if (operation === 'move') {
			dx = _dx;
			dy = _dy;
		} else if (operation === 'scale') {
			if (direction === 'left-top') {
				let d = Infinity;
				d = Math.min(_dx, _dy * ratio);
				dx = d;
				dw = -d;
				dy = d / ratio;
			}
			if (direction === 'right-bottom') {
				let d = -Infinity;
				d = Math.max(_dx, _dy * ratio);
				dw = d;
			}
		}
	}

	function handlePanEnd(event) {
		if (operation === 'move') {
			onupdate({
				x: x + dx,
				y: y + dy
			});
			dx = 0;
			dy = 0;
		} else if (operation === 'scale') {
			onupdate({
				x: x + dx,
				y: y + dy,
				width: width + dw,
				scale: (width + dw) / originWidth
			});
			dx = 0;
			dy = 0;
			dw = 0;
			direction = '';
		}
		operation = '';
	}

	function handlePanStart(event) {
		startX = event.detail.x;
		startY = event.detail.y;
		if (event.detail.target === event.currentTarget) {
			return (operation = 'move');
		}
		operation = 'scale';
		direction = event.detail.target.dataset.direction;
	}

	function onDelete() {
		ondelete();
	}

	onMount(render);
</script>

<div
	class="absolute left-0 top-0 select-none"
	style="width: {width + dw}px; height: {(width + dw) / ratio}px; transform:translate({x + dx}px, {y + dy}px);"
>
	<div
		use:pannable
		onpanstart={handlePanStart}
		onpanmove={handlePanMove}
		onpanend={handlePanEnd}
		class="absolute w-full h-full cursor-grab border border-gray-400 border-dashed"
		class:cursor-grabbing={operation === 'move'}
		class:operation
	>
		<div
			data-direction="left-top"
			class="absolute left-0 top-0 w-10 h-10 bg-green-400 rounded-full
      cursor-nwse-resize transform -translate-x-1/2 -translate-y-1/2 md:scale-25"
		></div>
		<div
			data-direction="right-bottom"
			class="absolute right-0 bottom-0 w-10 h-10 bg-green-400 rounded-full
      cursor-nwse-resize transform translate-x-1/2 translate-y-1/2 md:scale-25"
		></div>
	</div>
	<button
		onclick={onDelete}
		class="absolute left-0 top-0 right-0 w-12 h-12 m-auto rounded-full bg-white
    cursor-pointer transform -translate-y-1/2 md:scale-25"
	>
		<img class="w-full h-full" src="delete.svg" alt="Sil" />
	</button>
	<svg bind:this={svg} width="100%" height="100%">
		<path stroke-width="5" stroke-linejoin="round" stroke-linecap="round" stroke="black" fill="none" d={path} />
	</svg>
</div>

<style>
	.operation {
		background-color: rgba(0, 0, 0, 0.1);
	}
</style>
