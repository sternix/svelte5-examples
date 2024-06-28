<script>
    import readStore from "$lib/utils/readStore";

    const mobileMenu = readStore("contextIsMobileMenuVisible");
</script>

<button
    onclick={() => (mobileMenu.value = !mobileMenu.value)}
    class="mr-3 text-slate-500 hover:text-slate-600 lg:hidden"
>
    <!--<span class="sr-only">Open sidebar</span>-->
    <svg
        class="w-6 h-6 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect x="4" y="5" width="16" height="2" />
        <rect x="4" y="11" width="16" height="2" />
        <rect x="4" y="17" width="16" height="2" />
    </svg>
</button>
