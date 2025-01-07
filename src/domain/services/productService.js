import {
    createProduct,
    updateById,
    deleteById,
} from '../../infrastructure/repositories/productRepositoryWrite.js';
import {
    getAllProducts,
    getById,
    getByCategory,
} from '../../infrastructure/repositories/productRepositoryRead.js';
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

export async function deleteProductService(id) {
    try {
        return await deleteById(id);
    } catch (error) {
        throw new AppError(error.message || 'Error deleting the product', 500);
    }
}

export async function getAllProductsService() {
    try {
        return await getAllProducts();
    } catch (error) {
        throw new AppError(error.message || 'Error getting the products', 500);
    }
}

export async function getByIdService(id) {
    try {
        return await getById(id);
    } catch (error) {
        throw new AppError(error.message || 'Error getting the product', 500);
    }
}

export async function getByCategoryService(category) {
    try {
        return await getByCategory(category);
    } catch (error) {
        throw new AppError(error.message || 'Error getting the products', 500);
    }
}