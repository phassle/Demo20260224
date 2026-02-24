import { FastifyInstance } from "fastify";
import { randomUUID } from "crypto";
import { orders, CreateOrderSchema } from "../models/order.js";

export async function orderRoutes(app: FastifyInstance) {
  // GET /api/orders
  app.get("/", async () => {
    return orders;
  });

  // GET /api/orders/:id
  app.get<{ Params: { id: string } }>("/:id", async (request, reply) => {
    const order = orders.find((o) => o.id === request.params.id);
    if (!order) {
      return reply.status(404).send({ error: "Order not found" });
    }
    return order;
  });

  // POST /api/orders
  app.post("/", async (request, reply) => {
    const parsed = CreateOrderSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: parsed.error.issues });
    }

    const order = {
      id: randomUUID(),
      ...parsed.data,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    };
    orders.push(order);
    return reply.status(201).send(order);
  });
}
