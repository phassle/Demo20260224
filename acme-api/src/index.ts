import Fastify from "fastify";
import { productRoutes } from "./routes/products.js";
import { orderRoutes } from "./routes/orders.js";

const app = Fastify({ logger: true });

app.register(productRoutes, { prefix: "/api/products" });
app.register(orderRoutes, { prefix: "/api/orders" });

app.get("/api/health", async () => {
  return { status: "ok", timestamp: new Date().toISOString() };
});

const start = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log("Acme API running on http://localhost:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

export { app };
