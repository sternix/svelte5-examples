<script>
	import clickOutside from '$lib/utils/clickOutside';
	import imageAvatar from '$lib/images/logo.webp';
	import { slide } from 'svelte/transition';

	let {
		children,
		propButtonText = 'SIGN OUT',
		propButtonLink = '/',
		propImage,
		propTitle = 'John Smith',
		propInternalTitle = 'John Smith',
		propInternalSubtitle,
		propUserMenuArray = [
			{
				stringText: 'GITHUB',
				stringHref: 'https://github.com/joaquimnetocel/svelte-bird',
				stringTarget: '_blank',
			},
			{
				stringText: 'NPM',
				stringHref: 'https://www.npmjs.com/package/svelte-bird',
				stringTarget: '_blank',
			},
		],
	} = $props();

	let expanded = $state(false);
</script>

<div use:clickOutside={() => (expanded = false)} class="relative inline-flex">
	<button
		onclick={() => (expanded = !expanded)}
		class="inline-flex items-center justify-center group"
		aria-haspopup="true"
		aria-expanded="false"
	>
		<img
			class="w-8 h-8 rounded-full"
			src={propImage ?? imageAvatar}
			width="32"
			height="32"
			alt="User"
		/>
		<div class="flex items-center truncate">
			<span
				class="ml-2 !md:text-sm font-medium truncate group-hover:text-slate-800 dark:text-slate-300 dark:group-hover:text-slate-200"
			>
				{propTitle}
			</span>
			<svg class="w-3 h-3 ml-1 fill-current shrink-0 text-slate-400" viewBox="0 0 12 12">
				<path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
			</svg>
		</div>
	</button>
	{#if expanded}
		<div
			transition:slide
			class="min-w-44 absolute right-0 top-full z-10 mt-1 origin-top-right overflow-hidden rounded border border-slate-200 bg-white py-1.5 shadow-lg dark:border-slate-700 dark:bg-slate-800"
			class:enter-done={expanded}
			class:exit-done={!expanded}
		>
			<div>
				<div class="mb-1 border-b border-slate-200 px-3 pb-2 pt-0.5 dark:border-slate-700">
					{#if children}
						{@render children()}
					{:else}
						<div class="font-medium text-slate-800 dark:text-slate-100">{propInternalTitle}</div>
						{#if propInternalSubtitle !== undefined}
							<div class="text-xs italic text-slate-500 dark:text-slate-400">
								{propInternalSubtitle}
							</div>
						{/if}
					{/if}
				</div>
				<ul>
					{#each propUserMenuArray as currentUserMenu}
						<li>
							<a
								class="flex items-center px-3 py-1 text-sm font-medium hover:bg-gray-200 dark:hover:text-indigo-400"
								href={currentUserMenu.stringHref}
								target={currentUserMenu.stringTarget}
							>
								<!-- eslint-disable-next-line svelte/no-at-html-tags -->
								{@html currentUserMenu.stringText}
							</a>
						</li>
					{/each}
				</ul>
				{#if propButtonText !== ''}
					<div class="mt-1 border-t border-slate-200 px-3 pt-2 pb-0.5 dark:border-slate-700">
						<a
							href={propButtonLink}
							class="block px-3 py-1 font-semibold text-center border rounded whitespace-nowrap bg-zinc-100 text-zinc-700 border-zinc-700 hover:bg-zinc-300 hover:border-transparent"
						>
							{propButtonText}
						</a>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>