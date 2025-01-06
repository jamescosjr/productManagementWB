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

describe('POST /products', () => {
    describe("success cases", () => {
        it("should return 201 when creating a product", async () => {
            const product = {
                name: "Product 1",
                category: "Category 1",
                price: 10,
                stock: 10
            };

            const response = await supertest(app).post("/products").send(product);

            expect(response.status).toBe(201);
            expect(response.body).toEqual(expect.objectContaining(product));
        });
    });

    describe("non succes cases", () => {
        it("should return 400 when name is not provided", async () => {
            const product = {
                category: "Category 1",
                price: 10,
                stock: 10
            };

            const response = await supertest(app).post("/products").send(product);

            expect(response.status).toBe(400);
            expect(response.body).toMatchObject({
                message: "The name should be a valid string",
            });
        });
        it("should return 400 when category is not provided", async () => {
            const product = {
                name: "Product 1",
                price: 10,
                stock: 10
            };

            const response = await supertest(app).post("/products").send(product);

            expect(response.status).toBe(400);
            expect(response.body).toMatchObject({
                message: "The category should be a valid string",
            });
        });
        it("should return 400 when price is not provided", async () => {
            const product = {
                name: "Product 1",
                category: "Category 1",
                stock: 10
            };

            const response = await supertest(app).post("/products").send(product);

            expect(response.status).toBe(400);
            expect(response.body).toMatchObject({
                message: "The price should be a valid number",
            });
        });
        it("should return 400 when stock is not provided", async () => {
            const product = {
                name: "Product 1",
                category: "Category 1",
                price: 10
            };

            const response = await supertest(app).post("/products").send(product);

            expect(response.status).toBe(400);
            expect(response.body).toMatchObject({
                message: "The stock should be a valid integer",
            });
        });
        it("should return 500", async () => {
            jest.spyOn(Product.prototype, 'save').mockImplementationOnce(() => {
                throw new AppError("Database error");
            });
            const response = await supertest(app).post("/products").send({
                name: "Product 1",
                category: "Category 1",
                price: 10,
                stock: 10
            });

            expect(response.status).toBe(500);
            expect(response.body).toMatchObject({
                message: "Database error",
            });
        });
    });
});
