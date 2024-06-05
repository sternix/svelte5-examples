import * as pdfjsDist from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.min.mjs';
pdfjsDist.GlobalWorkerOptions.workerSrc = import.meta.url + 'pdfjs-dist/build/pdf.worker.min.mjs';

//import { getAsset } from './prepareAssets';

export function readAsArrayBuffer(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result);
		reader.onerror = reject;
		reader.readAsArrayBuffer(file);
	});
}

export function readAsImage(src) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = reject;
		if (src instanceof Blob) {
			const url = window.URL.createObjectURL(src);
			img.src = url;
		} else {
			img.src = src;
		}
	});
}

export function readAsDataURL(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result);
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
}

export async function readAsPDF(file) {
	//const pdfjsLib = await getAsset('pdfjsLib');
	// Safari possibly get webkitblobresource error 1 when using origin file blob
	const blob = new Blob([file]);
	const url = window.URL.createObjectURL(blob);
	//return pdfjsLib.getDocument(url).promise;
	return pdfjsDist.getDocument(url).promise;
}
