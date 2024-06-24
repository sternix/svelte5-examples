<script>
    // https://github.com/heygwangjin/svelte5-todo
    let todos = $state([]);
    let filter = $state("all");
    let filteredTodos = $derived(filterTodos());

    $effect(() => {
        const savedTodos = localStorage.getItem("todos");
        savedTodos && (todos = JSON.parse(savedTodos));
    });

    $effect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    });

    function addTodo(e) {
        if (e.key !== "Enter") return;
        const todoEl = e.target;
        const text = todoEl.value;
        if (!text) return;
        const done = false;
        todos.push({ text, done });
        todoEl.value = "";
    }

    function editTodo(e) {
        const inputEl = e.target;
        const index = +inputEl.dataset.index;
        todos[index].text = inputEl.value;
    }

    function toggleTodo(e) {
        const inputEl = e.target;
        const index = +inputEl.dataset.index;
        todos[index].done = !todos[index].done;
    }

    function setFilter(newFilter) {
        filter = newFilter;
    }

    function clearCompleted() {
        todos = todos.filter((todo) => !todo.done);
    }

    function clearAll() {
        todos = [];
    }

    function filterTodos() {
        switch (filter) {
            case "all":
                return todos;
            case "active":
                return todos.filter((todo) => !todo.done);
            case "completed":
                return todos.filter((todo) => todo.done);
        }
    }

    function remaining() {
        return todos.filter((todo) => !todo.done).length;
    }

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
</script>

<svelte:head>
    <title>Svelte 5 Todo</title>
</svelte:head>

<input type="text" onkeydown={addTodo} placeholder="Add Todo" />

<div class="todos">
    {#each filteredTodos as todo, i}
        <div class:completed={todo.done} class="todo">
            <input
                type="text"
                oninput={editTodo}
                data-index={i}
                value={todo.text}
                disabled={todo.done}
            />
            <input
                type="checkbox"
                onchange={toggleTodo}
                data-index={i}
                checked={todo.done}
            />
        </div>
    {/each}
</div>

<div class="filters">
    {#each ["all", "active", "completed"] as filter}
        <button onclick={() => setFilter(filter)}>{capitalize(filter)}</button>
    {/each}
</div>

<div class="clears">
    <button
        class="clear"
        disabled={remaining() === todos.length}
        onclick={clearCompleted}>Clear Completed</button
    >
    <button class="clear" disabled={todos.length <= 0} onclick={clearAll}
        >Clear All</button
    >
</div>

<p>{remaining()} remaining</p>

<style>
    :global(html, body) {
        height: 100%;
    }

    :global(body) {
        display: grid;
        place-content: center;
        color: hsl(220 10% 8%);
    }

    .todos {
        display: grid;
        gap: 1rem;
        margin-block-start: 1rem;
    }

    .todo {
        position: relative;
        transition: opacity 0.3s;
    }

    .completed {
        opacity: 0.3;
    }

    input[type="text"] {
        width: 100%;
        padding: 1rem;
    }

    input[type="checkbox"] {
        position: absolute;
        right: 4%;
        top: 50%;
        translate: 0% -50%;
    }

    .clears {
        display: flex;
        gap: 1rem;
    }

    .clear {
        width: 100%;
        white-space: nowrap;
    }

    .filters {
        display: flex;
        gap: 1rem;
        margin-block: 1rem;
    }
</style>
