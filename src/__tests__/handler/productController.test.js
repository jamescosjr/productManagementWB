import {
  createProductHandler,
  getProductsHandler,
  getProductByIdHandler,
  getProductsByCategoryHandler,
  getProductsByPriceHandler,
  getProductsByStockHandler,
  updateProductHandler,
  deleteProductHandler,
} from "../../handler/productController.js";
import * as productRepository from "../../repository/productRepository.js";
import * as productValidator from "../../utils/productValidator.js";

describe("Product Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should create a product", () => {
    const req = {
      body: {
        name: "Product",
        category: "Category",
        price: 10,
        stock: 10,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    createProductHandler(req, res);

    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledWith({
      id: expect.any(String),
      name: "Product",
      category: "Category",
      price: 10,
      stock: 10,
    });
  });

  it("should return an error when creating a product with invalid data", () => {
    const req = {
      body: {
        name: "Product",
        category: "Category",
        price: "10",
        stock: "10",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    createProductHandler(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ error: "Invalid product" });
  });

  it("should return an error when creating a product with an error", () => {
    const req = {
      body: {
        name: "Product",
        category: "Category",
        price: 10,
        stock: 10,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest
      .spyOn(productRepository, "createProduct")
      .mockImplementationOnce(() => {
        throw new Error();
      });

    createProductHandler(req, res);

    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledWith({ error: "Internal Server Error" });
  });

  it("should get all products", () => {
    const req = {};
    const res = {
      json: jest.fn(),
    };

    jest.spyOn(productRepository, "listProducts").mockReturnValueOnce([
      {
        id: "1",
        name: "Product",
        category: "Category",
        price: 10,
        stock: 10,
      },
    ]);

    getProductsHandler(req, res);

    expect(res.json).toBeCalledWith([
      {
        id: "1",
        name: "Product",
        category: "Category",
        price: 10,
        stock: 10,
      },
    ]);
  });

  it("should return an error when getting all products with an error", () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(productRepository, "listProducts").mockImplementationOnce(() => {
      throw new Error();
    });

    getProductsHandler(req, res);

    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledWith({ error: "Internal Server Error" });
  });

  it("should get a product by id", () => {
    const req = {
      params: {
        id: "1",
      },
    };
    const res = {
      json: jest.fn(),
    };

    jest.spyOn(productRepository, "findProductById").mockReturnValueOnce({
      id: "1",
      name: "Product",
      category: "Category",
      price: 10,
      stock: 10,
    });

    getProductByIdHandler(req, res);

    expect(res.json).toBeCalledWith({
      id: "1",
      name: "Product",
      category: "Category",
      price: 10,
      stock: 10,
    });
  });

  it("should return an error when getting a product by id with an error", () => {
    const req = {
      params: {
        id: "1",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest
      .spyOn(productRepository, "findProductById")
      .mockImplementationOnce(() => {
        throw new Error();
      });

    getProductByIdHandler(req, res);

    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledWith({ error: "Internal Server Error" });
  });

  it("should return an error when getting a product by id that does not exist", () => {
    const req = {
      params: {
        id: "1",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest
      .spyOn(productRepository, "findProductById")
      .mockReturnValueOnce(undefined);

    getProductByIdHandler(req, res);

    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({ error: "Product not found" });
  });

  it("should get products by category", () => {
    const req = {
      params: {
        category: "Category",
      },
    };
    const res = {
      json: jest.fn(),
    };

    jest.spyOn(productRepository, "listByCategory").mockReturnValueOnce([
      {
        id: "1",
        name: "Product",
        category: "Category",
        price: 10,
        stock: 10,
      },
    ]);

    getProductsByCategoryHandler(req, res);

    expect(res.json).toBeCalledWith([
      {
        id: "1",
        name: "Product",
        category: "Category",
        price: 10,
        stock: 10,
      },
    ]);
  });

  it("should return an error when getting products by category with an error", () => {
    const req = {
      params: {
        category: "Category",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest
      .spyOn(productRepository, "listByCategory")
      .mockImplementationOnce(() => {
        throw new Error();
      });

    getProductsByCategoryHandler(req, res);

    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledWith({ error: "Internal Server Error" });
  });

  it("should return an error when getting products by category that do not exist", () => {
    const req = {
      params: {
        category: "Category",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(productRepository, "listByCategory").mockReturnValueOnce([]);

    getProductsByCategoryHandler(req, res);

    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({ error: "Products not found" });
  });

  it("should get products by price", () => {
    const req = {
      params: {
        price: "10",
      },
    };
    const res = {
      json: jest.fn(),
    };

    jest.spyOn(productRepository, "listByPrice").mockReturnValueOnce([
      {
        id: "1",
        name: "Product",
        category: "Category",
        price: 10,
        stock: 10,
      },
    ]);

    getProductsByPriceHandler(req, res);

    expect(res.json).toBeCalledWith([
      {
        id: "1",
        name: "Product",
        category: "Category",
        price: 10,
        stock: 10,
      },
    ]);
  });

  it("should return an error when getting products by price with an error", () => {
    const req = {
      params: {
        price: "10",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(productRepository, "listByPrice").mockImplementationOnce(() => {
      throw new Error();
    });

    getProductsByPriceHandler(req, res);

    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledWith({ error: "Internal Server Error" });
  });

  it("should return an error when getting products by price that do not exist", () => {
    const req = {
      params: {
        price: "10",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(productRepository, "listByPrice").mockReturnValueOnce([]);

    getProductsByPriceHandler(req, res);

    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({ error: "Products not found" });
  });

  it("should get products by stock", () => {
    const req = {
      params: {
        stock: "10",
      },
    };
    const res = {
      json: jest.fn(),
    };

    jest.spyOn(productRepository, "listByStock").mockReturnValueOnce([
      {
        id: "1",
        name: "Product",
        category: "Category",
        price: 10,
        stock: 10,
      },
    ]);

    getProductsByStockHandler(req, res);

    expect(res.json).toBeCalledWith([
      {
        id: "1",
        name: "Product",
        category: "Category",
        price: 10,
        stock: 10,
      },
    ]);
  });

  it("should return an error when getting products by stock with an error", () => {
    const req = {
      params: {
        stock: "10",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(productRepository, "listByStock").mockImplementationOnce(() => {
      throw new Error();
    });

    getProductsByStockHandler(req, res);

    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledWith({ error: "Internal Server Error" });
  });

  it("should return an error when getting products by stock that do not exist", () => {
    const req = {
      params: {
        stock: "10",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(productRepository, "listByStock").mockReturnValueOnce([]);

    getProductsByStockHandler(req, res);

    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({ error: "Products not found" });
  });

  it("should return 200 and the updated product if successful", async () => {
    const req = {
      params: { id: "1" },
      body: { name: "Product", category: "Category", price: 10, stock: 5 },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    jest.spyOn(productValidator, "validateProduct").mockReturnValueOnce(true);
    jest
      .spyOn(productRepository, "updateProduct")
      .mockResolvedValueOnce(req.body);

    await updateProductHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  it("should return 400 if the product is invalid", async () => {
    const req = {
      params: { id: "1" },
      body: { name: "Product", category: "Category", price: "10", stock: 5 },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    jest.spyOn(productValidator, "validateProduct").mockReturnValueOnce(false);

    await updateProductHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid product" });
  });

  it("should return 404 if the product is not found", async () => {
    const req = {
      params: { id: "1" },
      body: { name: "Product", category: "Category", price: 10, stock: 5 },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    jest.spyOn(productValidator, "validateProduct").mockReturnValueOnce(true);
    jest.spyOn(productRepository, "updateProduct").mockResolvedValueOnce(false);

    await updateProductHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Product not found" });
  });

  it("should return 500 if an error occurs", async () => {
    const req = {
      params: { id: "1" },
      body: { name: "Product", category: "Category", price: 10, stock: 5 },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    jest.spyOn(productValidator, "validateProduct").mockReturnValueOnce(true);
    jest.spyOn(productRepository, "updateProduct").mockRejectedValueOnce();

    await updateProductHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });

  it("should delete a product", () => {
    const req = {
      params: {
        id: "1",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(productRepository, "deleteProduct").mockReturnValueOnce(true);

    deleteProductHandler(req, res);

    expect(res.status).toBeCalledWith(204);
  });

    it("should return an error when deleting a product with an error", () => {
        const req = {
        params: {
            id: "1",
        },
        };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };
    
        jest
        .spyOn(productRepository, "deleteProduct")
        .mockImplementationOnce(() => {
            throw new Error();
        });
    
        deleteProductHandler(req, res);
    
        expect(res.status).toBeCalledWith(500);
        expect(res.json).toBeCalledWith({ error: "Internal Server Error" });
    });

    it("should return an error when deleting a product that does not exist", () => {
        const req = {
        params: {
            id: "1",
        },
        };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };
    
        jest
        .spyOn(productRepository, "deleteProduct")
        .mockReturnValueOnce(false);
    
        deleteProductHandler(req, res);
    
        expect(res.status).toBeCalledWith(404);
        expect(res.json).toBeCalledWith({ error: "Product not found" });
    });

    it("should return an error when deleting a product with an invalid id", () => {
        const req = {
        params: {
            id: "invalid_id",
        },
        };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };
    
        deleteProductHandler(req, res);
    
        expect(res.status).toBeCalledWith(404);
        expect(res.json).toBeCalledWith({ error: "Product not found" });
    });
});
