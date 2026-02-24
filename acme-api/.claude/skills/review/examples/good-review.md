# Example: Good review output

## Review of src/routes/products.ts

✅ **Zod validation** — All input validated via `CreateProductSchema.safeParse()`
✅ **Types** — No `any` types. Proper `Product` type used throughout
✅ **Error handling** — Consistent `{ error: "..." }` format, correct status codes
⚠️ **Tests** — Happy path covered, but missing edge case for empty name
❌ **Hardcoded** — Port number 3000 hardcoded in route, should be in config

### Verdict: **Request changes**
Fix the hardcoded port and add the missing edge case test.
