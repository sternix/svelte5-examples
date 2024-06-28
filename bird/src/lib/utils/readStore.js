import { getContext } from "svelte";

export default function readStore(context) {
    return getContext(context);
}