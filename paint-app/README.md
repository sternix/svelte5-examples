# Svelte Paint App

[https://paint-app-react.netlify.app/](https://paint-app-react.netlify.app/)

uygulamasının react ile yazılmış halini

[https://github.com/sternix/react-examples/tree/main/paint-app](https://github.com/sternix/react-examples/tree/main/paint-app)

Svelte 5 ile yazmaya çalıştım,

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