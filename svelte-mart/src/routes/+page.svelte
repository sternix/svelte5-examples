<script>
	import CartItem from '$lib/components/CartItem.svelte';
	import ShoppingCart from 'phosphor-svelte/lib/ShoppingCart';
	import X from 'phosphor-svelte/lib/X';

	// +page.js'den gelen products
	let { data } = $props();
	let cartOpen = $state(false);
	let cartProducts = $state([]);

	const cartStats = $derived.by(() => {
		let quantity = 0;
		let total = 0;

		for (const product of cartProducts) {
			quantity += product.quantity;
			total += product.product.price * product.quantity;
		}

		return {
			quantity,
			total
		};
	});

	const qualifiesForFreeShipping = $derived(cartStats.total >= 50);
	let freeShippingAlert = false;

	$effect(() => {
		if (freeShippingAlert) return;
		if (qualifiesForFreeShipping) {
			alert('Ücretsiz kargo hakkı kazandınız!');
			freeShippingAlert = true;
		}
	});

	function removeFromCart(id) {
		cartProducts = cartProducts.filter((product) => product.id !== id);
	}
</script>

<div class="flex items-center bg-gray-300 p-4">
	<span class="text-lg font-bold">SvelteMart</span>
	<div class="relative ml-auto flex items-center">
		<button
			onclick={() => (cartOpen = !cartOpen)}
			class="flex items-center rounded-full bg-sky-600 px-4 py-2 text-white hover:bg-sky-700"
		>
			<ShoppingCart class="mr-2 size-5" />
			<span>Sepetiniz ({cartStats.quantity})</span>
		</button>
		{#if cartOpen}
			<div class="absolute right-0 top-8 z-10 mt-2 w-80 rounded-lg bg-white shadow-xl">
				<div class="relative p-4">
					<h2 class="mb-4 text-lg font-semibold">Kartınız</h2>
					<button
						class="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100"
						aria-label="close cart"
						onclick={() => (cartOpen = false)}
					>
						<X class="size-4" />
					</button>
					{#each cartProducts as _, i}
						<CartItem bind:cartProduct={cartProducts[i]} removeItem={removeFromCart} />
					{/each}
					<div class="mt-4 border-gray-200 pt-4">
						<p class="text-lg font-semibold">Toplam: ${cartStats.total.toFixed(2)}</p>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<div class="grid gap-6 bg-gray-100 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
	{#each data.products as product}
		<div class="overflow-hidden rounded-xl bg-white shadow-lg">
			<img src={product.thumbnail} alt={product.title} class="h-48 w-full object-cover" />
			<div class="p-4">
				<p class="mb-2 overflow-hidden truncate text-lg font-medium text-gray-800">
					{product.title}
				</p>
				<div class="flex items-center justify-between">
					<p class="text-xl font-bold">${product.price}</p>
					<button
						class="rounded-full bg-sky-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-sky-700 active:scale-95"
						onclick={() => {
							const prd = cartProducts.find((p) => product.id === p.product.id);
							if (prd) {
								prd.quantity++;
							} else {
								cartProducts.push({
									id: crypto.randomUUID(),
									quantity: 1,
									product: product
								});
							}
						}}
					>
						Sepete ekle
					</button>
				</div>
			</div>
		</div>
	{/each}
</div>