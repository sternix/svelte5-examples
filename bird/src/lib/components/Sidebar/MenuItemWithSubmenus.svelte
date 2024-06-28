<script>
    import readStore from "$lib/utils/readStore";
    import { slide } from "svelte/transition";

    let {
        propData,
        propExpandAllMenus,
        propSidebarExpanded = $bindable(),
    } = $props();

    const mobileMenu = readStore("contextIsMobileMenuVisible");
    const activeMenu = readStore("contextActiveMenu");
    const expandedMenu = readStore("contextExpandedMenu");

    let stateExpanded = $state(
        propExpandAllMenus || expandedMenu.value === propData.stringName,
    );

    $effect(() => {
        stateExpanded =
            propExpandAllMenus || expandedMenu.value === propData.stringName;
    });
</script>

<li
    class:bg-slate-900={expandedMenu.value === propData.stringName}
    class="px-3 py-2 mb-0.5 rounded-sm last:mb-0"
>
    <button
        type="button"
        onclick={() => {
            stateExpanded = !stateExpanded;
            propSidebarExpanded = true;
        }}
        class="flex w-full duration-150 items-centertransition text-slate-200 hover:text-slate-200"
    >
        <div class="flex items-center justify-between flex-grow">
            <div class="flex items-center">
                <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                {@html propData.stringIcon ?? ""}
                <span
                    class="ml-3 text-sm font-medium duration-200 classSidebarExpanded:whitespace-normal lg:classSidebarExpanded:opacity-100 lg:opacity-0 2xl:opacity-100"
                >
                    {propData.stringText}
                </span>
            </div>
            <div class="flex ml-2 shrink-0">
                <svg
                    class:rotate-90={stateExpanded}
                    class="w-3 h-3 ml-1 fill-current false shrink-0 text-slate-400"
                    viewBox="0 0 12 12"
                >
                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                </svg>
            </div>
        </div>
    </button>
    {#if stateExpanded}
        <div
            transition:slide
            class="lg:classSidebarExpanded:block lg:hidden 2xl:block"
        >
            <ul class="mt-1 pl-7">
                {#each propData.arraySubmenus as currentSubmenu}
                    <li class="mb-1 last:mb-0">
                        <a
                            onclick={() => {
                                mobileMenu.value = false;
                                activeMenu.value = currentSubmenu.stringName;
                                expandedMenu.value = propData.stringName;
                            }}
                            class:bg-gradient-to-r={currentSubmenu.stringName ===
                                activeMenu.value}
                            class:from-[#fcb69f]={currentSubmenu.stringName ===
                                activeMenu.value}
                            class:to-[#ffecd2]={currentSubmenu.stringName ===
                                activeMenu.value}
                            class:text-black={currentSubmenu.stringName ===
                                activeMenu.value}
                            class:text-slate-400={currentSubmenu.stringName !==
                                activeMenu.value}
                            aria-current="page"
                            class="block truncate transition duration-150 rounded-md ps-2"
                            href={currentSubmenu.stringHref}
                            target={currentSubmenu.stringTarget}
                        >
                            <div
                                class="flex items-center justify-between py-1 text-sm font-medium whitespace-normal duration-200 lg:classSidebarExpanded:opacity-100 lg:opacity-0 2xl:opacity-100"
                            >
                                {currentSubmenu.stringText}
                                {#if currentSubmenu.stringBadge !== undefined}
                                    <div
                                        class:text-white={activeMenu.value ===
                                            currentSubmenu.stringName}
                                        class:bg-slate-800={activeMenu.value ===
                                            currentSubmenu.stringName}
                                        class:text-slate-700={activeMenu.value !==
                                            currentSubmenu.stringName}
                                        class:bg-slate-100={activeMenu.value !==
                                            currentSubmenu.stringName}
                                        class="flex items-center h-5 px-2 mr-1 text-xs font-medium rounded"
                                    >
                                        {currentSubmenu.stringBadge}
                                    </div>
                                {/if}
                            </div>
                        </a>
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</li>
