<script>
    let { propSidebarExpanded = $bindable() } = $props();

    function handleClick() {
        propSidebarExpanded = !propSidebarExpanded;
        localStorage.setItem(
            "storageSidebarExpanded",
            propSidebarExpanded ? "true" : "false",
        );
    }
</script>

<div class="justify-end hidden pt-3 mt-auto lg:flex 2xl:hidden">
    <div class="px-3 py-2">
        <button onclick={handleClick}>
            <span class="sr-only">Expand / Collapse sidebar</span>
            <svg
                class="w-6 h-6 fill-current classSidebarExpanded:rotate-180"
                viewBox="0 0 24 24"
            >
                <path
                    class="text-slate-400"
                    d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path class="text-slate-600" d="M3 23H1V1h2z" />
            </svg>
        </button>
    </div>
</div>
