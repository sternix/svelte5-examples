# Svelte Paint App

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```sh
vim tailwind.config.js
```
```js
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {}
  },
  plugins: []
};
```