import { Product }from '../schemas/productSchema.js';
import { AppError } from '../../domain/error/customErros.js';

export async function getAllProducts() {
    try{
        const products = await Product.find();
        return products;
    } catch(error){
        throw new AppError(error.message, 500);
    }
}

export async function getById(id) {
    try{
        const product = await Product.findById(id);
        return product;
    } catch(error){
        throw new AppError(error.message, 500);
    }
}