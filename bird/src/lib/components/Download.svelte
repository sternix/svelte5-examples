<script>
    let visible = $state(true);
</script>

{#if visible}
    <div class="fixed z-50 w-auto bottom-10 right-12">
        <div
            class="flex justify-between p-3 text-sm border border-transparent shadow-lg bg-slate-800 text-slate-50 dark:border-slate-700 md:rounded"
        >
            <div class="inline-flex space-x-1 text-slate-500">
                <span>CHECK IT ON</span>
                <a
                    class="font-medium text-slate-50 hover:underline"
                    href="https://github.com/joaquimnetocel/svelte-bird"
                    target="_blank"
                    rel="noreferrer"
                >
                    GITHUB
                </a>
                <span class="italic">OR</span>
                <a
                    class="font-medium text-emerald-400 hover:underline"
                    href="https://www.npmjs.com/package/svelte-bird"
                    target="_blank"
                    rel="noreferrer"
                >
                    NPM
                </a>
            </div>
            <button
                onclick={() => (visible = !visible)}
                class="pl-2 ml-3 border-l border-gray-700 text-slate-500 hover:text-slate-400"
            >
                <span class="sr-only">Close</span>
                <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                    <path
                        d="M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L9.426 8l3.293-3.293a1 1 0 000-1.414z"
                    />
                </svg>
            </button>
        </div>
    </div>
{/if}
