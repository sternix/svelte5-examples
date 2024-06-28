<script>
	import MobileMenuButton from '$lib/components/MobileMenuButton.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import createPersistentStore from '$lib/utils/createPersistentStore.svelte';
	import createStore from '$lib/utils/createStore.svelte';
	import isRunningOnBrowser from '$lib/utils/isRunningOnBrowser';
	import readStore from '$lib/utils/readStore';
	import imageLogo from '$lib/images/logo.webp';

	let {
		children,
		snippetHeader,
		snippetFooter,
		propSidebarData,
		propExpandAllMenus = true,
		propLogoImage,
		propLogoWidth,
		propLogoHref,
		propTitle,
	} = $props();

	createStore(false, 'contextIsMobileMenuVisible');
	createPersistentStore(false, 'contextIsInDarkMode');
	createStore('', 'contextActiveMenu');
	createStore('', 'contextExpandedMenu');
	const storeDarkMode = readStore('contextIsInDarkMode');

	let sidebarExpanded = $state(functionSidebarExpanded());
	function functionSidebarExpanded() {
		if (isRunningOnBrowser()) {
			return localStorage.getItem('storageSidebarExpanded') === 'false' ? false : true;
		}
		return true;
	}
</script>

<div
	id="idHtml"
	class:dark={storeDarkMode.value}
	style:color-scheme={storeDarkMode.value ? 'dark' : ''}
>
	<div
		id="idBody"
		class:classSidebarExpanded={sidebarExpanded}
		class="antialiased font-inter bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-400"
	>
		<div class="flex h-screen overflow-hidden">
			<Sidebar
				bind:propSidebarExpanded={sidebarExpanded}
				{propSidebarData}
				{propExpandAllMenus}
				{propLogoImage}
				{propLogoWidth}
				{propTitle}
				{propLogoHref}
			/>
			<div class="relative flex flex-col flex-1 overflow-x-hidden overflow-y-hidden">
				<header
					class="sticky top-0 z-30 border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-[#182235]"
				>
					<div class="flex px-4 sm:px-6 lg:px-8">
						<MobileMenuButton />
						<div class="flex items-center justify-between flex-grow h-16 -mb-px">
							<a class="flex items-center space-x-2 lg:hidden" href={propLogoHref ?? '/'}>
								<img src={propLogoImage ?? imageLogo} alt="Logo" width={propLogoWidth ?? 30} />
								<div class="hidden text-2xl font-bold md:block bold">
									{propTitle ?? 'SVELTE-BIRD'}
								</div>
							</a>
							{@render snippetHeader()}
						</div>
					</div>
				</header>
				<main class="flex flex-col flex-grow overflow-y-auto">
					{@render children()}
				</main>
				<footer
					class="px-2 sm:px-4 lg:px-4 sticky z-30 border-t border-slate-400 bg-white dark:border-slate-700 dark:bg-[#182235]"
				>
					{@render snippetFooter()}
				</footer>
			</div>
		</div>
	</div>
</div>