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

describe("PUT /products/:id", () => {
    describe("succes cases", () => {
        it("should return 200 when updating a product", async () => {
            const product = new Product({
                name: "Product 1",
                category: "Category 1",
                price: 10,
                stock: 10
            });
            const databaseProduct = await product.save();

            const updatedProduct = {
                name: "Product 2",
                category: "Category 2",
                price: 20,
                stock: 20
            };

            const response = await supertest(app).put(`/products/${databaseProduct._id}`).send(updatedProduct);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(expect.objectContaining(updatedProduct));
        });
    });
    describe("non success cases", () => {
        it("should return 400 when name is not provided", async () => {
            const product = new Product({
                name: "Product 1",
                category: "Category 1",
                price: 10,
                stock: 10
            });
            const databaseProduct = await product.save();

            const updatedProduct = {
                category: "Category 2",
                price: 20,
                stock: 20
            };

            const response = await supertest(app).put(`/products/${databaseProduct._id}`).send(updatedProduct);

            expect(response.status).toBe(400);
            expect(response.body).toMatchObject({
                message: "The name should be a valid string",
            });
        });
        it("should return 400 when category is not provided", async () => {
            const product = new Product({
                name: "Product 1",
                category: "Category 1",
                price: 10,
                stock: 10
            });
            const databaseProduct = await product.save();

            const updatedProduct = {
                name: "Product 2",
                price: 20,
                stock: 20
            };

            const response = await supertest(app).put(`/products/${databaseProduct._id}`).send(updatedProduct);

            expect(response.status).toBe(400);
            expect(response.body).toMatchObject({
                message: "The category should be a valid string",
            });
        });
        it("should return 400 when price is not provided", async () => {
            const product = new Product({
                name: "Product 1",
                category: "Category 1",
                price: 10,
                stock: 10
            });
            const databaseProduct = await product.save();

            const updatedProduct = {
                name: "Product 2",
                category: "Category 2",
                stock: 20
            };

            const response = await supertest(app).put(`/products/${databaseProduct._id}`).send(updatedProduct);

            expect(response.status).toBe(400);
            expect(response.body).toMatchObject({
                message: "The price should be a valid number",
            });
        });
        it("should return 400 when stock is not provided", async () => {
            const product = new Product({
                name: "Product 1",
                category: "Category 1",
                price: 10,
                stock: 10
            });
            const databaseProduct = await product.save();

            const updatedProduct = {
                name: "Product 2",
                category: "Category 2",
                price: 20
            };

            const response = await supertest(app).put(`/products/${databaseProduct._id}`).send(updatedProduct);

            expect(response.status).toBe(400);
            expect(response.body).toMatchObject({
                message: "The stock should be a valid integer",
            });
        });
        it("should return 404 when the product is not found", async () => {
            const updatedProduct = {
                name: "Product 2",
                category: "Category 2",
                price: 20,
                stock: 20
            };

            const response = await supertest(app).put(`/products/677aa30f88a6da644245cae7`).send(updatedProduct);

            expect(response.status).toBe(404);
            expect(response.body).toMatchObject({
                message: "Product not found",
            });
        });
        it("should return 500 when there is an error in the repository", async () => {
            const product = new Product({
                name: "Product 1",
                category: "Category 1",
                price: 10,
                stock: 10
            });
            const databaseProduct = await product.save();

            jest.spyOn(Product, 'findByIdAndUpdate').mockImplementationOnce(async () => {
                throw new AppError("Database error");
            });

            const updatedProduct = {
                name: "Product 2",
                category: "Category 2",
                price: 20,
                stock: 20
            };

            const response = await supertest(app).put(`/products/${databaseProduct._id}`).send(updatedProduct);

            expect(response.status).toBe(500);
            expect(response.body).toMatchObject({
                message: "Database error",
            });
        });
    })
});