import { z } from "zod";

export const OrderSchema = z.object({
  id: z.string().uuid(),
  customerEmail: z.string().email(),
  items: z.array(
    z.object({
      productId: z.string().uuid(),
      quantity: z.number().int().positive(),
    })
  ).min(1),
  status: z.enum(["pending", "confirmed", "shipped", "delivered"]),
  createdAt: z.string().datetime(),
});

export const CreateOrderSchema = OrderSchema.pick({
  customerEmail: true,
  items: true,
});

export type Order = z.infer<typeof OrderSchema>;
export type CreateOrder = z.infer<typeof CreateOrderSchema>;

// In-memory store (demo only)
export const orders: Order[] = [
  {
    id: "d4e5f6a7-b8c9-0123-defa-234567890123",
    customerEmail: "alice@example.com",
    items: [{ productId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", quantity: 1 }],
    status: "shipped",
    createdAt: "2026-02-20T10:00:00Z",
  },
];
