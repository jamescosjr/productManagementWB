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

describe("GET /products", () => {
    describe("success cases", () => {
        it("should return 200 when getting all products", async () => {
            const product = new Product({
                name: "Product 1",
                category: "Category 1",
                price: 10,
                stock: 10
            });
            await product.save();

            const response = await supertest(app).get(`/products`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        name: "Product 1",
                        category: "Category 1",
                        price: 10,
                        stock: 10
                    })
                ])
            );
        });
        it("should return 200 when getting all products with empty array", async () => {
            const response = await supertest(app).get(`/products`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });
    });
    describe("non success cases", () => {
        it("should return 500 when database error", async () => {
            jest.spyOn(Product, 'find').mockImplementationOnce(() => {
                throw new Error();
            });

            const response = await supertest(app).get(`/products`);

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Error getting the products' });
        });
    });
});