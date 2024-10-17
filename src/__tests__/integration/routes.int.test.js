import request from "supertest";
import { app, server } from "../../../server.js";
import { products } from "../../repository/productRepository.js";

afterAll(() => {
  server.close();
});

describe("Routes Integration Test", () => {
  beforeEach(() => {
    jest.resetModules();
    products.length = 0;
  });
  it("should show all the proccess from route to the array of create a product /", async () => {
    const product = {
      name: "product",
      price: 10,
      stock: 10,
      category: "category",
    };
    const response = await request(app).post("/products").send(product);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ ...product, id: expect.any(String) });
    expect(products).toEqual([{ ...product, id: expect.any(String) }]);
  });

  it("should show all the proccess from route to the array of get all products /", async () => {
    const product = {
      name: "product",
      price: 10,
      stock: 10,
      category: "category",
    };
    products.push(product);
    const response = await request(app).get("/products");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([product]);
  });

  it("should show all the proccess from route to the array of get product by id /", async () => {
    const product = {
      id: "1",
      name: "product",
      price: 10,
      stock: 10,
      category: "category",
    };
    products.push(product);
    const response = await request(app).get(`/products/${product.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(product);
  });

  it("should show all the proccess from route to the array of get product by category /", async () => {
    const product = {
      name: "product",
      price: 10,
      stock: 10,
      category: "category",
    };
    products.push(product);
    const response = await request(app).get(
      `/products/category/${product.category}`
    );
    expect(response.status).toBe(200);
    expect(response.body).toEqual([product]);
  });

  it("should show all the proccess from route to the array of get product by price /", async () => {
    const product = {
      name: "product",
      price: 10,
      stock: 10,
      category: "category",
    };
    products.push(product);
    const response = await request(app).get(`/products/price/${product.price}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([product]);
  });

  it("should show all the proccess from route to the array of get product by stock /", async () => {
    const product = {
      name: "product",
      price: 10,
      stock: 10,
      category: "category",
    };
    products.push(product);
    const response = await request(app).get(`/products/stock/${product.stock}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([product]);
  });

  it("should show all the proccess from route to the array of update a product /", async () => {
    const product = {
      id: "1",
      name: "product",
      price: 10,
      stock: 10,
      category: "category",
    };
    products.push(product);
    const newProduct = {
      name: "newProduct",
      price: 20,
      stock: 20,
      category: "newCategory",
    };
    const response = await request(app)
      .put(`/products/${product.id}`)
      .send(newProduct);
    expect(response.status).toBe(200);
    expect(products).toEqual([{ ...newProduct, id: product.id }]);
  });

  it("should show all the proccess from route to the array of delete a product /", async () => {
    const product = {
      id: "1",
      name: "product",
      price: 10,
      stock: 10,
      category: "category",
    };
    products.push(product);
    const response = await request(app).delete(`/products/${product.id}`);
    expect(response.status).toBe(204);
    expect(products).toEqual([]);
  });
});
