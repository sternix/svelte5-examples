# static

```
npm i -D @sveltejs/adapter-static
```

svelte.config.js
```
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: 'index.html'
		})
	}
};

export default config;
```


src/routes/+layout.js
```
export const ssr = false;
```


site http://abc.com/xyz olarak sunulacak ise
svelte.config.js
```js
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: 'index.html'
		}),
		paths: {
			base: '/xyz',
		},
	}
};

export default config;
```