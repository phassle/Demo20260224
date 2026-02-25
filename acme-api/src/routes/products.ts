import { FastifyInstance } from "fastify";
import { randomUUID } from "crypto";
import { products, CreateProductSchema } from "../models/product.js";

export async function productRoutes(app: FastifyInstance) {
  // GET /api/products
  app.get("/", async () => {
    return products;
  });

  // GET /api/products/:id
  app.get<{ Params: { id: string } }>("/:id", async (request, reply) => {
    const product = products.find((p) => p.id === request.params.id);
    if (!product) {
      return reply.status(404).send({ error: "Product not found" });
    }
    return product;
  });

  // DELETE /api/products/:id
  app.delete<{ Params: { id: string } }>("/:id", async (request, reply) => {
    const index = products.findIndex((p) => p.id === request.params.id);
    if (index === -1) {
      return reply.status(404).send({ error: "Product not found" });
    }
    const [deleted] = products.splice(index, 1);
    return deleted;
  });

  // POST /api/products
  app.post("/", async (request, reply) => {
    const parsed = CreateProductSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: parsed.error.issues });
    }

    const product = { id: randomUUID(), ...parsed.data };
    products.push(product);
    return reply.status(201).send(product);
  });
}
