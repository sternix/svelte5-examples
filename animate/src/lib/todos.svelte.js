
class TodoStore {
    #uid = 1;
    #todos = $state([]);

    constructor(initial) {
        this.#todos = initial.map(({ done, description }) => {
            return {
                id: this.#uid++,
                done,
                description
            }
        })
    }

    get todos() {
        return this.#todos;
    }

    add(description) {
        const todo = {
            id: this.#uid++,
            done: false,
            description
        }

        this.#todos.push(todo);
    }

    remove(todo) {
        this.#todos = this.#todos.filter((t) => t.id !== todo.id)
    }

    mark(todo, done) {
        // bu şekilde en alta koyuyor
        this.#todos = [...this.#todos.filter((t) => t.id !== todo.id), { ...todo, done }]
        /* bu şekilde order'ı koruyor,
        const _todo = this.#todos.find(t => t.id === todo.id);
        if (_todo) {
            _todo.done = done
        }
        */
    }
}

export function createTodoStore(initial) {
    return new TodoStore(initial)
}