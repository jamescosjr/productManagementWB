import { Product }from '../schemas/productSchema.js';
import { AppError } from '../../domain/error/customErros.js';

export async function createProduct({ name, category, price, stock }) {
    try {
        const newProduct = new Product({
            name,
            category,
            price,
            stock,
        });
        return await newProduct.save();
    } catch (error) {
        throw new AppError(error.message || 'Database error', 500);
    }
}