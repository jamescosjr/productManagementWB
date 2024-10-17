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

export function listByStock(stock) {
    return products.filter((product) => product.stock === stock);
}

export function deleteProduct(id) {
    const index = products.findIndex((product) => product.id === id);
    if (index === -1) {
        return false;
    }
    products.splice(index, 1);
    return true;
}

export function updateProduct(id, newProduct) {
    const index = products.findIndex((product) => product.id === id);
    if (index === -1) {
        return false;
    }
    products[index] = { ...newProduct, id };
    return true;
}