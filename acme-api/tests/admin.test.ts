import { describe, it, expect } from "vitest";
import { app } from "../src/index.js";

describe("GET /admin", () => {
  it("returns 200", async () => {
    const response = await app.inject({ method: "GET", url: "/admin" });
    expect(response.statusCode).toBe(200);
  });

  it("returns text/html content-type", async () => {
    const response = await app.inject({ method: "GET", url: "/admin" });
    expect(response.headers["content-type"]).toMatch(/text\/html/);
  });

  it("contains dashboard title", async () => {
    const response = await app.inject({ method: "GET", url: "/admin" });
    expect(response.body).toContain("Admin Dashboard");
  });

  it("contains expected stat values from seed data", async () => {
    const response = await app.inject({ method: "GET", url: "/admin" });
    // 3 products, 1 order, revenue = 1 × $79.99 = $79.99
    expect(response.body).toContain("3");
    expect(response.body).toContain("1");
    expect(response.body).toContain("79.99");
    expect(response.body).toContain("shipped");
    expect(response.body).toContain("electronics");
  });
});
