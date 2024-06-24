<script>
	import Minus from 'phosphor-svelte/lib/Minus';
	import Plus from 'phosphor-svelte/lib/Plus';
	import Trash from 'phosphor-svelte/lib/Trash';

	let { cartProduct = $bindable(), removeItem } = $props();
</script>

<div class="flex items-center justify-between border-b border-gray-200 py-2">
	<div class="flex items-center">
		<img src={cartProduct.product.thumbnail} alt="Ürün" class="mr-4 size-12 rounded object-cover" />
		<div>
			<p class="font-medium">{cartProduct.product.title}</p>
			<p class="text-sm">Adet fiyatı: ${cartProduct.product.price}</p>
		</div>
	</div>
	<div class="flex items-center">
		<button
			onclick={() => {
				if (cartProduct.quantity === 1) {
					removeItem(cartProduct.id);
				} else {
					cartProduct.quantity--;
				}
			}}
		>
			<Minus class="size-4" />
		</button>
		<span class="mx-2">
			{cartProduct.quantity}
		</span>
		<button
			class="rounded p-1 hover:bg-gray-200"
			aria-label="1 tane daha ekle"
			onclick={() => cartProduct.quantity++}
		>
			<Plus class="size-4" />
		</button>
		<button
			onclick={() => removeItem(cartProduct.id)}
			class="ml-4 rounded p-1 text-red-500 hover:bg-red-100"
		>
			<Trash class="size-4" />
		</button>
	</div>
</div>
