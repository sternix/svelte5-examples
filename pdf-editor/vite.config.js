import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
	base: '', // relative path için
	build: {
		target: "es2022", // await import için
		chunkSizeWarningLimit: 5000, // dosya boyut uyarı vermemesi için
	},
	esbuild: {
		target: "es2022"
	},
	optimizeDeps: {
		esbuildOptions: {
			target: "es2022",
		}
	},
	plugins: [svelte()]
});
