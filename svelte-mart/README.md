# svelte-mart
[https://github.com/huntabyte/svelte-mart](https://github.com/huntabyte/svelte-mart)

```
npm create svelte@latest svelte-mart
cd svelte-mart
npm install

npm install tailwindcss@next @tailwindcss/vite@next

npm install --force -D phosphor-svelte

```

vim src/style.css
```css
@import "tailwindcss";
```

vim vite.config.js
```js
import tailwindcss from '@tailwindcss/vite'
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sveltekit(), tailwindcss()]
});
```

vim src/routes/+layout.svelte
```svelte
<script>
    import '../style.css';

    let { children } = $props();
</script>

{@render children() }
```


vim tailwind.config.js
```js
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {}
    },
    plugins: []
};
```

vim src/routes/+page.svelte
```svelte
<h1 class="flex items-center justify-center w-full">Hello World</h1>
```

```sh
npm run dev
```