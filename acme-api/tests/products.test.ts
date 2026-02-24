import { describe, it, expect } from "vitest";
import { CreateProductSchema } from "../src/models/product.js";

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
