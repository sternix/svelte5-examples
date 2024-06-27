<script>
    import { flip } from "svelte/animate";
    import { send, receive } from "./transition";

    let { store, done } = $props();
</script>

<ul class="todos">
    {#each store.todos.filter((todo) => todo.done === done) as todo (todo.id)}
        <li
            class:done
            in:receive={{ key: todo.id }}
            out:send={{ key: todo.id }}
            animate:flip={{ duration: 200 }}
        >
            <label>
                <input
                    type="checkbox"
                    checked={todo.done}
                    onchange={(e) => store.mark(todo, e.currentTarget.checked)}
                />

                <span>{todo.description}</span>
                <button onclick={() => store.remove(todo)} aria-label="Remove"
                ></button>
            </label>
        </li>
    {/each}
</ul>

<style>
    label {
        width: 100%;
        height: 100%;
        gap: 0.5rem;
        display: flex;
    }

    .done {
        opacity: 0.5;
    }

    span {
        flex: 1;
    }

    button {
        background-image: url(./remove.svg);
    }

    ul.todos {
        padding: 0;
    }

    ul.todos li:not(:has(> form)) {
        position: relative;
        display: flex;
        align-items: center;
        padding: 0.5em 0.5em 0.5em 1em;
        margin: 0 0 0.5em 0;
        gap: 0.5em;
        border-radius: 5px;
        user-select: none;
        background: var(--bg-1);
        filter: drop-shadow(2px 3px 6px rgba(0, 0, 0, 0.1));
        transition:
            filter 0.2s,
            opacity 0.2s;
    }

    ul.todos button {
        border: none;
        background-color: transparent;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-size: 1rem 1rem;
        cursor: pointer;
        width: 3em;
        height: 3em;
        margin: -0.5em -0.5em -0.5em 0;
        aspect-ratio: 1;
        opacity: 0.5;
        transition: opacity 0.2s;
    }

    ul.todos button:hover {
        opacity: 1;
    }
</style>
