import { createProduct, listProducts, findProductById, findProductByName, listByCategory } from "../../repository/productRepository.js";
import { generateId } from "../../utils/idGenerator.js";
import { products } from "../../repository/productRepository.js";

jest.mock("../../utils/idGenerator.js");
const mockGenerateId = generateId;

describe("ProductManagementRepository", () => {
  beforeEach(() => {
    products.length = 0;
    generateId.mockClear();
  });
  it("should create a product and add to the array", () => {
    const product = {
      name: "Product 1",
      category: "Category 1",
      price: 100,
      stock: 10,
    };
    const id = generateId();
    mockGenerateId.mockReturnValue(id);
    const expectedProduct = {
      id,
      name: "Product 1",
      category: "Category 1",
      price: 100,
      stock: 10,
    };
    createProduct(product);
    expect(products).toHaveLength(1);
    expect(products[0]).toEqual(expectedProduct);
  });

  it("should use the method listProducts correctly", () => {
    const product = {
      name: "Product 1",
      category: "Category 1",
      price: 100,
      stock: 10,
    };
    const id = generateId();
    mockGenerateId.mockReturnValue(id);
    createProduct(product);
    const product2 = {
      name: "Product 2",
      category: "Category 2",
      price: 200,
      stock: 20,
    };
    const id2 = generateId();
    mockGenerateId.mockReturnValue(id2);
    createProduct(product2);
    const expectedProducts = [
      {
        id,
        name: "Product 1",
        category: "Category 1",
        price: 100,
        stock: 10,
      },
      {
        id: id2,
        name: "Product 2",
        category: "Category 2",
        price: 200,
        stock: 20,
      },
    ];
    expect(listProducts()).toEqual(expectedProducts);
  });

    it ("should return an empty array when there are no products", () => {
        expect(listProducts()).toEqual([]);
    });

    it ("should return the product with the given id", () => {
        const product = {
            name: "Product 1",
            category: "Category 1",
            price: 100,
            stock: 10,
        };
        const id = generateId();
        mockGenerateId.mockReturnValue(id);
        createProduct(product);

       const  expectedProduct = {
            id,
            name: "Product 1",
            category: "Category 1",
            price: 100,
            stock: 10,
        };
        expect(findProductById(id)).toEqual(expectedProduct);
    });

    it ("should return undefined when the product with the given id does not exist", () => {
        expect(findProductById("123")).toBeUndefined();
    });

    it ("should return the product with the given name", () => {
        const product = {
            name: "Product 1",
            category: "Category 1",
            price: 100,
            stock: 10,
        };
        const id = generateId();
        mockGenerateId.mockReturnValue(id);
        createProduct(product);

        const expectedProduct = {
            id,
            name: "Product 1",
            category: "Category 1",
            price: 100,
            stock: 10,
        };
        expect(findProductByName("Product 1")).toEqual(expectedProduct);
    });

    it ("should return undefined when the product with the given name does not exist", () => {
        expect(findProductByName("Product 1")).toBeUndefined();
    });

    it ("should return an empty array when there are no products with the given category", () => {
        expect(listByCategory("Category 1")).toEqual([]);
    });

    it ("should return the products with the given category", () => {
        const product = {
            name: "Product 1",
            category: "Category 1",
            price: 100,
            stock: 10,
        };
        const id = generateId();
        mockGenerateId.mockReturnValue(id);
        createProduct(product);

        const product2 = {
            name: "Product 2",
            category: "Category 1",
            price: 200,
            stock: 20,
        };
        const id2 = generateId();
        mockGenerateId.mockReturnValue(id2);
        createProduct(product2);

        const expectedProducts = [
            {
                id,
                name: "Product 1",
                category: "Category 1",
                price: 100,
                stock: 10,
            },
            {
                id: id2,
                name: "Product 2",
                category: "Category 1",
                price: 200,
                stock: 20,
            },
        ];
        expect(listByCategory("Category 1")).toEqual(expectedProducts);
    });

    it ("should return an empty array when there are no products with the given price", () => {
        expect(listByCategory("Category 1")).toEqual([]);
    });

    it ("should return the products with the given price", () => {
        const product = {
            name: "Product 1",
            category: "Category 1",
            price: 100,
            stock: 10,
        };
        const id = generateId();
        mockGenerateId.mockReturnValue(id);
        createProduct(product);

        const product2 = {
            name: "Product 2",
            category: "Category 1",
            price: 100,
            stock: 20,
        };
        const id2 = generateId();
        mockGenerateId.mockReturnValue(id2);
        createProduct(product2);

        const expectedProducts = [
            {
                id,
                name: "Product 1",
                category: "Category 1",
                price: 100,
                stock: 10,
            },
            {
                id: id2,
                name: "Product 2",
                category: "Category 1",
                price: 100,
                stock: 20,
            },
        ];
        expect(listByCategory("Category 1")).toEqual(expectedProducts);
    });

    it ("should return an empty array when there are no products with the given stock", () => {
        expect(listByCategory("Category 1")).toEqual([]);
    });

    it ("should return the products with the given stock", () => {
        const product = {
            name: "Product 1",
            category: "Category 1",
            price: 100,
            stock: 10,
        };
        const id = generateId();
        mockGenerateId.mockReturnValue(id);
        createProduct(product);

        const product2 = {
            name: "Product 2",
            category: "Category 1",
            price: 200,
            stock: 10,
        };
        const id2 = generateId();
        mockGenerateId.mockReturnValue(id2);
        createProduct(product2);

        const expectedProducts = [
            {
                id,
                name: "Product 1",
                category: "Category 1",
                price: 100,
                stock: 10,
            },
            {
                id: id2,
                name: "Product 2",
                category: "Category 1",
                price: 200,
                stock: 10,
            },
        ];
        expect(listByCategory("Category 1")).toEqual(expectedProducts);
    });
});
