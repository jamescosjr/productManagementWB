import {
    createProductHandler,
    getProductsHandler,
    getProductByIdHandler,
    getProductsByCategoryHandler,
    getProductsByPriceHandler,
    getProductsByStockHandler,
} from '../../handler/productController.js';
import productRepository from '../../repository/productRepository.js';

jest.mock('../../repository/productRepository.js', () => ({
    createProduct: jest.fn(),
    getProducts: jest.fn(),
    getProductById: jest.fn(),
    getProductsByCategory: jest.fn(),
    getProductsByPrice: jest.fn(),
    getProductsByStock: jest.fn(),
}));

describe('ProductController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it ('should return 201 when create a product', async () => {
        const req = {
            body: {
                name: 'Product 1',
                category: 'Category 1',
                price: 10,
                stock: 10
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        productRepository.createProduct.mockReturnValue(req.body);

        await createProductHandler(req, res);

        expect(productRepository.createProduct).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(req.body);
    });

    it ('should return 400 when create a invalid product', async () => {
        const req = {
            body: {
                name: 'Product 1',
                category: 'Category 1',
                price: 10,
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await createProductHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid product' });
    });

    it ('should return 500 when repository throws an error', async () => {
        const req = {
            body: {
                name: 'Product 1',
                category: 'Category 1',
                price: 10,
                stock: 10
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        productRepository.createProduct.mockImplementation(() => {
            throw new Error();
        });

        await createProductHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });

    it ('should return all products', async () => {
        const req = {};
        const res = {
            json: jest.fn(),
        };
        const products = [
            {
                name: 'Product 1',
                category: 'Category 1',
                price: 10,
                stock: 10
            },
            {
                name: 'Product 2',
                category: 'Category 2',
                price: 20,
                stock: 20
            }
        ];

        productRepository.getProducts.mockReturnValue(products);

        await getProductsHandler(req, res);

        expect(res.json).toHaveBeenCalledWith(products);
    });

    it ('should return empty array when there are no products', async () => {
        const req = {};
        const res = {
            json: jest.fn(),
        };

        productRepository.getProducts.mockReturnValue([]);

        await getProductsHandler(req, res);

        expect(res.json).toHaveBeenCalledWith([]);
    });

    it ('should return 500 when repository throws an error', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        productRepository.getProducts.mockImplementation(() => {
            throw new Error();
        });

        await getProductsHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });

    it ("should return 200 when get product by id", async () => {
        const req = {
            params: {
                id: '1'
            }
        };
        const res = {
            json: jest.fn(),
        };
        const product = {
            name: 'Product 1',
            category: 'Category 1',
            price: 10,
            stock: 10
        };

        productRepository.getProductById.mockReturnValue(product);

        await getProductByIdHandler(req, res);

        expect(productRepository.getProductById).toHaveBeenCalledWith('1');
        expect(res.json).toHaveBeenCalledWith(product);
    });

    it ('should return 404 when product not found', async () => {
        const req = {
            params: {
                id: '1'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        productRepository.getProductById.mockReturnValue(null);

        await getProductByIdHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Product not found' });
    });

    it ('should return 500 when repository throws an error', async () => {
        const req = {
            params: {
                id: '1'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        productRepository.getProductById.mockImplementation(() => {
            throw new Error();
        });

        await getProductByIdHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });

    it ('should return 200 when get products by category', async () => {
        const req = {
            params: {
                category: 'Category 1'
            }
        };
        const res = {
            json: jest.fn(),
        };
        const products = [
            {
                name: 'Product 1',
                category: 'Category 1',
                price: 10,
                stock: 10
            },
            {
                name: 'Product 2',
                category: 'Category 1',
                price: 20,
                stock: 20
            }
        ];

        productRepository.getProductsByCategory.mockReturnValue(products);

        await getProductsByCategoryHandler(req, res);

        expect(productRepository.getProductsByCategory).toHaveBeenCalledWith('Category 1');
        expect(res.json).toHaveBeenCalledWith(products);
    });

    it ('should return 404 when products not found', async () => {
        const req = {
            params: {
                category: 'Category 1'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        productRepository.getProductsByCategory.mockReturnValue([]);

        await getProductsByCategoryHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Products not found' });
    });

    it ('should return 500 when repository throws an error', async () => {
        const req = {
            params: {
                category: 'Category 1'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        productRepository.getProductsByCategory.mockImplementation(() => {
            throw new Error();
        });

        await getProductsByCategoryHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });

    it ('should return 200 when get products by price', async () => {
        const req = {
            params: {
                price: '10'
            }
        };
        const res = {
            json: jest.fn(),
        };
        const products = [
            {
                name: 'Product 1',
                category: 'Category 1',
                price: 10,
                stock: 10
            },
            {
                name: 'Product 2',
                category: 'Category 2',
                price: 10,
                stock: 20
            }
        ];

        productRepository.getProductsByPrice.mockReturnValue(products);

        await getProductsByPriceHandler(req, res);

        expect(productRepository.getProductsByPrice).toHaveBeenCalledWith(10);
        expect(res.json).toHaveBeenCalledWith(products);
    });

    it ('should return 404 when products not found', async () => {
        const req = {
            params: {
                price: '10'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        productRepository.getProductsByPrice.mockReturnValue([]);

        await getProductsByPriceHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Products not found' });
    });

    it ('should return 500 when repository throws an error', async () => {
        const req = {
            params: {
                price: '10'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        productRepository.getProductsByPrice.mockImplementation(() => {
            throw new Error();
        });

        await getProductsByPriceHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });

    it ('should return 200 when get products by stock', async () => {
        const req = {
            params: {
                stock: '10'
            }
        };
        const res = {
            json: jest.fn(),
        };
        const products = [
            {
                name: 'Product 1',
                category: 'Category 1',
                price: 10,
                stock: 10
            },
            {
                name: 'Product 2',
                category: 'Category 2',
                price: 20,
                stock: 10
            }
        ];

        productRepository.getProductsByStock.mockReturnValue(products);

        await getProductsByStockHandler(req, res);

        expect(productRepository.getProductsByStock).toHaveBeenCalledWith(10);
        expect(res.json).toHaveBeenCalledWith(products);
    });

    it ('should return 404 when products not found', async () => {
        const req = {
            params: {
                stock: '10'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        productRepository.getProductsByStock.mockReturnValue([]);

        await getProductsByStockHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Products not found' });
    });

    it ('should return 500 when repository throws an error', async () => {
        const req = {
            params: {
                stock: '10'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        productRepository.getProductsByStock.mockImplementation(() => {
            throw new Error();
        });

        await getProductsByStockHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
});
