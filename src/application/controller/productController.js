import { 
    createProductService,
    updateProductService,
    deleteProductService,
    getAllProductsService,
    getByIdService,
    getByCategoryService,
 } from "../../domain/services/productService";
import { AppError, ValidationError, NotFoundError } from "../../domain/error/customErros.js";
import { validateProduct } from "../../domain/utils/productValidator.js";

export async function createProductHandler(req, res, next) {
    const { name, category, price, stock } = req.body;

    const validation = validateProduct(name, category, price, stock);

    if(!validation.valid){
        return next(new ValidationError(validation.message));
    }

    try{
        const result = await createProductService({ name, category, price, stock });
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

export async function updateProductHandler(req, res, next) {
    const { id } = req.params;
    const { name, category, price, stock } = req.body;

    const validation = validateProduct(name, category, price, stock);

    if(!validation.valid){
        return next(new ValidationError(validation.message));
    }

    try{
        const result = await updateProductService(id, { name, category, price, stock });
        if(!result){
            return next(new NotFoundError('Product not found'));
        }
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export async function deleteProductHandler(req, res, next) {
    const { id } = req.params;

    try{
        const result = await deleteProductService(id);
        if(!result){
            return next(new NotFoundError('Product not found'));
        }
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}

export async function getProductsHandler(req, res, next) {
    try{
        const result = await getAllProductsService();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export async function getProductByIdHandler(req, res, next) {
    const { id } = req.params;

    try{
        const result = await getByIdService(id);
        if(!result){
            return next(new NotFoundError('Product not found'));
        }
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export async function getProductsByCategoryHandler(req, res, next) {
    const { category } = req.params;

    try{
        const result = await getByCategoryService(category);

        if(!result){
            return next(new NotFoundError('Product not found'));
        }

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}