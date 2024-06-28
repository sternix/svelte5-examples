import { setContext } from "svelte";

export default function createStore(initialValue, context) {
    const state = $state({ value: initialValue });
    setContext(context, state);
}