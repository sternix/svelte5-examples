<script>
	import logo from '$lib/images/logo.webp';

	let {
		children,
		propLogo,
		propWidth,
		propTitle,
		propHref,
	} = $props();
</script>

<a aria-current="page" class="flex items-center space-x-2" href={propHref || '/'}>
	<img src={propLogo ?? logo} alt="Logo" width={propWidth ?? 30} />
	{#if children}
		{@render children()}
	{:else}
		<span
			class="hidden text-xl font-bold text-gray-300 lg:text-2xl classSidebarExpanded:inline bold"
		>
			{propTitle ?? 'SVELTE-BIRD'}
		</span>
	{/if}
</a>