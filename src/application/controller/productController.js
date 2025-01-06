import { createProductService } from "../../domain/services/productService";
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