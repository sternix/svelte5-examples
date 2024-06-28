import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: 'index.html'
		}),
		/* site http://example.com/app 
		olarak sunulacak ise
		paths: {
			base: '/app',
		},
		*/
	}
};

export default config;
