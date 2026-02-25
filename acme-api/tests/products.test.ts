import { describe, it, expect, beforeEach } from "vitest";
import Fastify from "fastify";
import { CreateProductSchema, products, type Product } from "../src/models/product.js";
import { productRoutes } from "../src/routes/products.js";

const seedProducts: Product[] = [
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    name: "Wireless Keyboard",
    price: 79.99,
    category: "electronics",
    inStock: true,
  },
  {
    id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    name: "TypeScript Handbook",
    price: 39.99,
    category: "books",
    inStock: true,
  },
  {
    id: "c3d4e5f6-a7b8-9012-cdef-123456789012",
    name: "Ergonomic Mouse",
    price: 59.99,
    category: "electronics",
    inStock: false,
  },
];

describe("Product validation", () => {
  it("accepts a valid product", () => {
    const result = CreateProductSchema.safeParse({
      name: "Test Product",
      price: 29.99,
      category: "electronics",
      inStock: true,
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty name", () => {
    const result = CreateProductSchema.safeParse({
      name: "",
      price: 29.99,
      category: "electronics",
      inStock: true,
    });
    expect(result.success).toBe(false);
  });

  it("rejects negative price", () => {
    const result = CreateProductSchema.safeParse({
      name: "Test",
      price: -10,
      category: "electronics",
      inStock: true,
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid category", () => {
    const result = CreateProductSchema.safeParse({
      name: "Test",
      price: 10,
      category: "food",
      inStock: true,
    });
    expect(result.success).toBe(false);
  });
});

describe("DELETE /api/products/:id", () => {
  let app: ReturnType<typeof Fastify>;

  beforeEach(async () => {
    products.length = 0;
    products.push(...structuredClone(seedProducts));

    app = Fastify();
    app.register(productRoutes);
    await app.ready();
  });

  it("returns 404 for non-existent product", async () => {
    const res = await app.inject({
      method: "DELETE",
      url: "/00000000-0000-0000-0000-000000000000",
    });

    expect(res.statusCode).toBe(404);
    expect(res.json()).toEqual({ error: "Product not found" });
  });

  it("removes the product from the list", async () => {
    await app.inject({
      method: "DELETE",
      url: "/a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    });

    const res = await app.inject({ method: "GET", url: "/" });
    const ids = res.json().map((p: Product) => p.id);
    expect(ids).not.toContain("a1b2c3d4-e5f6-7890-abcd-ef1234567890");
    expect(res.json()).toHaveLength(2);
  });

  it("returns the deleted product", async () => {
    const res = await app.inject({
      method: "DELETE",
      url: "/a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    });

    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({
      id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      name: "Wireless Keyboard",
      price: 79.99,
      category: "electronics",
      inStock: true,
    });
  });
});
