import { describe, it, expect } from "vitest";
import { calculateDashboardStats } from "../src/services/dashboard-stats.js";
import { Product } from "../src/models/product.js";
import { Order } from "../src/models/order.js";

const sampleProducts: Product[] = [
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

const sampleOrders: Order[] = [
  {
    id: "d4e5f6a7-b8c9-0123-defa-234567890123",
    customerEmail: "alice@example.com",
    items: [{ productId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", quantity: 1 }],
    status: "shipped",
    createdAt: "2026-02-20T10:00:00Z",
  },
];

describe("calculateDashboardStats", () => {
  it("returns zeros for empty arrays", () => {
    const stats = calculateDashboardStats([], []);
    expect(stats.totalProducts).toBe(0);
    expect(stats.totalOrders).toBe(0);
    expect(stats.totalRevenue).toBe(0);
    expect(stats.ordersByStatus).toEqual({});
    expect(stats.productsByCategory).toEqual({});
  });

  it("counts products correctly", () => {
    const stats = calculateDashboardStats(sampleProducts, []);
    expect(stats.totalProducts).toBe(3);
  });

  it("counts orders correctly", () => {
    const stats = calculateDashboardStats([], sampleOrders);
    expect(stats.totalOrders).toBe(1);
  });

  it("calculates revenue from quantity × price", () => {
    const stats = calculateDashboardStats(sampleProducts, sampleOrders);
    expect(stats.totalRevenue).toBeCloseTo(79.99);
  });

  it("handles missing product in price lookup by defaulting to 0", () => {
    const ordersWithUnknownProduct: Order[] = [
      {
        id: "e5f6a7b8-c9d0-1234-efab-345678901234",
        customerEmail: "bob@example.com",
        items: [{ productId: "00000000-0000-0000-0000-000000000000", quantity: 5 }],
        status: "pending",
        createdAt: "2026-02-21T10:00:00Z",
      },
    ];
    const stats = calculateDashboardStats(sampleProducts, ordersWithUnknownProduct);
    expect(stats.totalRevenue).toBe(0);
  });

  it("groups orders by status", () => {
    const multiOrders: Order[] = [
      ...sampleOrders,
      {
        id: "e5f6a7b8-c9d0-1234-efab-345678901234",
        customerEmail: "bob@example.com",
        items: [{ productId: "b2c3d4e5-f6a7-8901-bcde-f12345678901", quantity: 1 }],
        status: "pending",
        createdAt: "2026-02-21T10:00:00Z",
      },
      {
        id: "f6a7b8c9-d0e1-2345-fabc-456789012345",
        customerEmail: "carol@example.com",
        items: [{ productId: "c3d4e5f6-a7b8-9012-cdef-123456789012", quantity: 2 }],
        status: "pending",
        createdAt: "2026-02-22T10:00:00Z",
      },
    ];
    const stats = calculateDashboardStats(sampleProducts, multiOrders);
    expect(stats.ordersByStatus["shipped"]).toBe(1);
    expect(stats.ordersByStatus["pending"]).toBe(2);
  });

  it("groups products by category", () => {
    const stats = calculateDashboardStats(sampleProducts, []);
    expect(stats.productsByCategory["electronics"]).toBe(2);
    expect(stats.productsByCategory["books"]).toBe(1);
  });
});
