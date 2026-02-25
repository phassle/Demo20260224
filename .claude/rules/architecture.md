# Architectural Patterns — Acme API

## Route pattern
Every route file exports a single async function that takes `FastifyInstance`:
```typescript
export async function xyzRoutes(app: FastifyInstance) {
  app.get("/", async () => { ... });
  app.post("/", async (request, reply) => { ... });
}
```
Registered in `src/index.ts` with a prefix: `app.register(xyzRoutes, { prefix: "/api/xyz" })`.

## Validation pattern
All input goes through Zod schemas defined in `src/models/`:
```typescript
const parsed = CreateXyzSchema.safeParse(request.body);
if (!parsed.success) {
  return reply.status(400).send({ error: parsed.error.issues });
}
```
Never access `request.body` directly without Zod validation.

## Error response pattern
Always return `{ error: "human-readable message" }` with appropriate status code:
- 400 = validation error
- 404 = resource not found
- 500 = unexpected server error (let Fastify handle these)

## Data layer
Currently in-memory arrays (demo project). In production: replace with database calls.
Each model file exports: schema, create-schema, type, and a data array.
