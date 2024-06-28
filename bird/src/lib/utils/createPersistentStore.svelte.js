import { browser } from "$app/environment";
import { setContext } from "svelte";


export default function createPersistentStore(initialValue, context) {
    const state = $state({ value: initialValue });

    if (browser) {
        const val = localStorage.getItem(context);
        if (val) {
            state.value = JSON.parse(val);
        }
    }

    $effect(() => {
        localStorage.setItem(context, JSON.stringify(state.value));
    })

    setContext(context, state);
}