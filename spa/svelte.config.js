import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: 'index.html'
		}),
		/* site http://abc.com/xyz 
		olarak sunulacak ise
		paths: {
			base: '/xyz',
		},
		*/
	}
};

export default config;
