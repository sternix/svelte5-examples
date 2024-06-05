import './app.css';
import App from './App.svelte';
//import { getAsset } from './utils/prepareAssets.js';

//getAsset('pdfjsLib');
/*
const app = new App({
	target: document.body
});

export default app;
*/

import { mount } from 'svelte';

const app = mount(App, { target: document.getElementById("app") });

export default app;
