import { FastifyInstance } from "fastify";
import { products } from "../models/product.js";
import { orders } from "../models/order.js";
import { calculateDashboardStats } from "../services/dashboard-stats.js";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function adminRoutes(app: FastifyInstance) {
  app.get("/", async (_request, reply) => {
    const stats = calculateDashboardStats(products, orders);

    const statusRows = Object.entries(stats.ordersByStatus)
      .map(([status, count]) => `<tr><td>${escapeHtml(status)}</td><td>${count}</td></tr>`)
      .join("");

    const categoryRows = Object.entries(stats.productsByCategory)
      .map(([category, count]) => `<tr><td>${escapeHtml(category)}</td><td>${count}</td></tr>`)
      .join("");

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Admin Dashboard</title>
  <style>
    body { font-family: sans-serif; margin: 2rem; background: #f5f5f5; }
    h1 { color: #333; }
    .cards { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem; }
    .card { background: #fff; border-radius: 8px; padding: 1.5rem 2rem; box-shadow: 0 2px 6px rgba(0,0,0,0.1); min-width: 160px; }
    .card h2 { margin: 0 0 0.5rem; font-size: 0.9rem; color: #666; text-transform: uppercase; }
    .card p { margin: 0; font-size: 2rem; font-weight: bold; color: #333; }
    table { border-collapse: collapse; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1); margin-bottom: 2rem; }
    th, td { padding: 0.75rem 1.5rem; text-align: left; border-bottom: 1px solid #eee; }
    th { background: #fafafa; color: #666; text-transform: uppercase; font-size: 0.8rem; }
    h2 { color: #444; }
  </style>
</head>
<body>
  <h1>Admin Dashboard</h1>
  <div class="cards">
    <div class="card">
      <h2>Total Products</h2>
      <p>${stats.totalProducts}</p>
    </div>
    <div class="card">
      <h2>Total Orders</h2>
      <p>${stats.totalOrders}</p>
    </div>
    <div class="card">
      <h2>Total Revenue</h2>
      <p>$${stats.totalRevenue.toFixed(2)}</p>
    </div>
  </div>

  <h2>Orders by Status</h2>
  <table>
    <thead><tr><th>Status</th><th>Count</th></tr></thead>
    <tbody>${statusRows}</tbody>
  </table>

  <h2>Products by Category</h2>
  <table>
    <thead><tr><th>Category</th><th>Count</th></tr></thead>
    <tbody>${categoryRows}</tbody>
  </table>
</body>
</html>`;

    return reply.type("text/html").send(html);
  });
}
