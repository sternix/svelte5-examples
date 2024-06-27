<script>
    import { createTodoStore } from "$lib/todos.svelte";
    import TodoList from "$lib/TodoList.svelte";

    const store = createTodoStore([
        { done: false, description: "Biraz makale yaz" },
        { done: false, description: "Blog gönderisi yazmaya başla" },
        { done: true, description: "Süt al" },
        { done: false, description: "Çimleri biç" },
        { done: false, description: "Kediyi besle" },
        { done: false, description: "Biraz hata düzelt" },
    ]);
</script>

<div class="board">
    <input
        placeholder="yeni bir iş"
        onkeydown={(e) => {
            if (e.key != "Enter") return;

            store.add(e.currentTarget.value);
            e.currentTarget.value = "";
        }}
    />

    <div class="todo">
        <h2>todo</h2>
        <TodoList {store} done={false} />
    </div>

    <div class="done">
        <h2>done</h2>
        <TodoList {store} done={true} />
    </div>
</div>

<style>
    .board {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 1em;
        max-width: 48em;
        margin: 0 auto;
    }

    .board > input {
        font-size: 1.4em;
        grid-column: 1/3;
        padding: 0.5em;
        margin: 0 0 1rem 0;
    }

    h2 {
        font-size: 2em;
        font-weight: 200;
    }

    :global(body) {
        --bg-1: hsl(0, 0%, 100%);
        --fg-1: hsl(0, 0%, 13%);
        --font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
            Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        background: var(--bg-1);
        color: var(--fg-1);
        font-family: var(--font);
        line-height: 1.5;
        margin: 1rem;
        height: calc(100vh - 2rem);
    }
</style>
