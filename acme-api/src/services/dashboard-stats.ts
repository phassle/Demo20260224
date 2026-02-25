import { Product } from "../models/product.js";
import { Order } from "../models/order.js";

export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  ordersByStatus: Record<string, number>;
  productsByCategory: Record<string, number>;
}

export function calculateDashboardStats(
  products: Product[],
  orders: Order[]
): DashboardStats {
  const priceMap = new Map<string, number>(
    products.map((p) => [p.id, p.price])
  );

  const totalRevenue = orders.reduce((sum, order) => {
    const orderTotal = order.items.reduce((itemSum, item) => {
      const price = priceMap.get(item.productId) ?? 0;
      return itemSum + price * item.quantity;
    }, 0);
    return sum + orderTotal;
  }, 0);

  const ordersByStatus: Record<string, number> = {};
  for (const order of orders) {
    ordersByStatus[order.status] = (ordersByStatus[order.status] ?? 0) + 1;
  }

  const productsByCategory: Record<string, number> = {};
  for (const product of products) {
    productsByCategory[product.category] =
      (productsByCategory[product.category] ?? 0) + 1;
  }

  return {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalRevenue,
    ordersByStatus,
    productsByCategory,
  };
}
