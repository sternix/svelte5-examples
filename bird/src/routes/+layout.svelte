<script>
	import { DarkModeButton, Links, Notifications, Search, User } from '$lib/components';
	import { Bird } from '$lib';
	import '../app.css';
	// PRODUCTION
	import { notificationsData } from '$lib/data/notifications';
	import { sidebarData } from '$lib/data/sidebar';
	import { userData } from '$lib/data/user';
	import { Notification } from '$lib/icons';

	let {
		children
	} = $props();
</script>

<Bird
	propLogoImage="images/logo.webp"
	propLogoWidth={30}
	propTitle={'SVELTE-BIRD'}
	propSidebarData={sidebarData}
	propExpandAllMenus={false}
	propLogoHref="/"
>
	<div class="px-4 py-4">
		<!-- <div class="h-auto min-h-full"> -->
		<!-- <div
				class="h-auto min-h-full px-4 py-4 dark:bg-[url('/images/backgrounds/header.png')] bg-[url('/images/backgrounds/clear.jpg')] bg-no-repeat bg-cover bg-center bg-fixed"
				> -->
		{@render children()}
		<!-- </div> -->
		<!-- </div> -->
	</div>
	{#snippet snippetHeader()}
		<div class="flex items-center space-x-3 ms-auto">
			<Search />
			<Notifications
				propData={notificationsData}
				propNewNotifications={true}
				propTitle="NOTIFICATIONS:"
				propIcon={Notification}
				propNotFoundMessage={'NO NOTIFICATION FOUND!'}
			/>
			<Links propTitle="CHOOSE YOUR LANGUAGE:" />
			<DarkModeButton />
			<hr class="w-px h-6 border-none bg-slate-200 dark:bg-slate-700" />
			<User
				propUserMenuArray={userData}
				propTitle="Joaquim"
				propInternalTitle="Joaquim"
				propButtonText="SIGN OUT"
				propButtonLink="/"
				propImage={undefined}
			/>
		</div>
	{/snippet}
	{#snippet snippetFooter()}
		<div class="flex items-center justify-between h-8">
			<div>All Rights Reserved ©</div>
			<div>Version 0.0.20</div>
		</div>
	{/snippet}
</Bird>