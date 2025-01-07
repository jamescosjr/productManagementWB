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

export async function updateById(id, { name, category, price, stock }) {
    try {
        return await Product.findByIdAndUpdate(id, { name, category, price, stock }, {new: true})
    } catch (error) {
        throw new AppError(error.message || 'Database error', 500);
    }
}

export async function deleteById(id) {
    try {
        return await Product.findByIdAndDelete(id, {lean: true});
    } catch (error) {
        throw new AppError(error.message || 'Database error', 500);
    }
}