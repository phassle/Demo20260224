import { describe, it, expect } from "vitest";
import { CreateOrderSchema } from "../src/models/order.js";

describe("Order validation", () => {
  it("accepts a valid order", () => {
    const result = CreateOrderSchema.safeParse({
      customerEmail: "alice@example.com",
      items: [
        { productId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", quantity: 2 },
      ],
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = CreateOrderSchema.safeParse({
      customerEmail: "not-an-email",
      items: [
        { productId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", quantity: 1 },
      ],
    });
    expect(result.success).toBe(false);
  });

  it("rejects zero quantity", () => {
    const result = CreateOrderSchema.safeParse({
      customerEmail: "bob@example.com",
      items: [
        { productId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", quantity: 0 },
      ],
    });
    expect(result.success).toBe(false);
  });

});
