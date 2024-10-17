import { generateId } from "../utils/idGenerator";

export const products = [];

export function createProduct(product) {
    const id = generateId();
    const newProduct = { ...product, id };
    products.push(newProduct);
    return newProduct;
}

export function listProducts() {
    return products;
}

export function findProductById(id) {
    return products.find((product) => product.id === id);
}

export function findProductByName(name) {
    return products.find((product) => product.name === name);
}
export function listByCategory(category) {
    return products.filter((product) => product.category === category);
}

export function listByPrice(price) {
    return products.filter((product) => product.price === price);
}