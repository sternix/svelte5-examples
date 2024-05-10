<script>
	let ad = 'Dünya';

	let count = 0;

	function increment() {
		count += 1;
	}

	const incr = () => {
		count += 1;
	};
</script>

<h1>Merhaba {ad} !</h1>

<button on:click={increment}>
	Clicks: {count}
</button>

<button on:click={incr}>
	Arrow: {count}
</button>

<button on:click={() => (count += 1)}>
	Inline : {count}
</button>
