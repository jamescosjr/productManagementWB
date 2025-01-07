import {
    createProduct,
    updateById
} from '../../infrastructure/repositories/productRepositoryWrite.js';
import { AppError } from '../error/customErros.js'

export async function createProductService({ name, category, price, stock }) {
    try {
        return await createProduct({ name, category, price, stock });
    } catch (error) {
        throw new AppError(error.message || 'Error creating the product', 500);
    }
}

export async function updateProductService(id, { name, category, price, stock }) {
    try{
        return await updateById(id, { name, category, price, stock });
    } catch (error) {
        throw new AppError(error.message || 'Error updating the product', 500);
    }
};