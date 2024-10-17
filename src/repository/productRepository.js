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