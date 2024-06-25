import { imageApiUrl } from '@/constants/api';

export async function fetchCats() {
    try {
        const response = await fetch(imageApiUrl);
        const catResponse = await response.json();
        return filterOutGif(catResponse);
    } catch (e) {
        console.error(e);
        return null;
    }
}

function filterOutGif(cats) {
    return cats.filter(cat => !cat.url.includes('.gif'))
}