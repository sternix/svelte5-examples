export async function load({ fetch }) {
    const products = await fetch('https://dummyjson.com/products').then(res => res.json());

    return {
        products: products.products
    };
}