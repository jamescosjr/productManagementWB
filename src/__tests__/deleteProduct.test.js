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

describe("DELETE /products/:id", () => {
    describe("success cases", () => {
        it("should return 204 when deleting a product", async () => {
            const product = new Product({
                name: "Product 1",
                category: "Category 1",
                price: 10,
                stock: 10
            });
            const databaseProduct = await product.save();

            const response = await supertest(app).delete(`/products/${databaseProduct._id}`);

            expect(response.status).toBe(204);
        });
    });
    describe("non success cases", () => {
        it("should return 404 when product not found", async () => {
            const response = await supertest(app).delete(`/products/677aa30f88a6da644245cae7`);

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'Product not found' });
        });
        it("should return 500 when database error", async () => {
            const product = new Product({
                name: "Product 1",
                category: "Category 1",
                price: 10,
                stock: 10
            });
            const databaseProduct = await product.save();

            jest.spyOn(Product, 'findByIdAndDelete').mockImplementationOnce(() => {
                throw new Error();
            });

            const response = await supertest(app).delete(`/products/${databaseProduct._id}`);

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Database error' });
        });
    });
});