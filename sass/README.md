# svelte'de sass (scss) kullanım örnekleri

Svelte'de sass kullanabilmek için önce sass kütüphanesini ekleyelim

```sh
npm install -D sass
```

sonra style taglarının scss dilinde olduğunu ve farklı bir program ile işlenmesi gerektiğini bildirelim
```html
<style lang="scss">
...

```

svelte.config.js dosyasını
```js
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter()
    }
};

export default config;
```
şeklinde düzenlediğimizde, scss dili ile yazılan kısımları vite, sass ile derleyip svelte'ye iletecektir.

# static dosya (asset) kullanımı

Svelte'de static içerik css, resim dosyalarını kök dizindeki static klasörüne kopyalayıp,
direk ismi ile kullanabiliyoruz

örneğin static/a.png dosyasını 
```html
<img src="/a.png">

yada

<img src="a.png">

```

şeklinde kullanabiliyoruz.
