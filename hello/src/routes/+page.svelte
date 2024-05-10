<script>
	let ad = 'Dünya';

	let count = 0;

	function increment() {
		count += 1;
	}

	const incr = () => {
		count += 1;
	};

	let adi;
	let soyadi;

	function onSubmit() {
		console.log(`Adı: ${adi}, Soyadı: ${soyadi}`);
	}
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

<form on:submit|preventDefault={onSubmit}>
	<label for="adi">Adı</label>
	<input type="text" name="adi" id="adi" bind:value={adi} />
	<br />
	<label for="soyadi">Soyadı</label>
	<input type="text" name="soyadi" id="soyadi" bind:value={soyadi} />
	<br />
	<button type="submit">Kaydet</button>
</form>
