import supertest from "supertest";
import { Product } from "../infrastructure/schemas/productSchema";
import { app } from "../../server";
import { AppError, ValidationError } from "../domain/error/customErros";
const dbHandler = require('../../jest/jest.setup');

beforeAll(async () => {
    await dbHandler.connect();
});

afterEach(async () => {
    await dbHandler.clearDatabase();
});

afterAll(async () => {
    await dbHandler.closeDatabase();
});

describe("GET /products/:id", () => {
    describe("success cases", () => {
        it("should return 200 when getting a product by id", async () => {
            const product = new Product({
                name: "Product 1",
                category: "Category 1",
                price: 10,
                stock: 10
            });
            await product.save();

            const response = await supertest(app).get(`/products/${product._id}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                name: "Product 1",
                category: "Category 1",
                price: 10,
                stock: 10,
                _id: expect.any(String),
                __v: 0
            });
        });
    });
    describe("non succes cases", () => {
        it("should return 500 when database error", async () => {
            jest.spyOn(Product, 'findById').mockImplementationOnce(() => {
                throw new Error();
            });

            const response = await supertest(app).get(`/products/1`);

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Error getting the product' });
        });
    });
});