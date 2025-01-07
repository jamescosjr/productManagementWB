import { Router } from "express";
import {
    createProductHandler,
    getProductsHandler,
    getProductByIdHandler,
    getProductsByCategoryHandler,
    // getProductsByPriceHandler,
    // getProductsByStockHandler,
    updateProductHandler,
    deleteProductHandler,

} from "../productController";

const router = Router();

router.post("/products", createProductHandler);
router.get("/products", getProductsHandler);
router.get("/products/:id", getProductByIdHandler);
router.get("/products/category/:category", getProductsByCategoryHandler);
// router.get("/products/price/:price", getProductsByPriceHandler);
// router.get("/products/stock/:stock", getProductsByStockHandler);
router.put("/products/:id", updateProductHandler);
router.delete("/products/:id", deleteProductHandler);

export default router;