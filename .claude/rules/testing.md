# Testing Conventions — Acme API

## Framework
Vitest. Config in `vitest.config.ts`. Run with `npm test`.

## Structure
Tests mirror `src/` structure:
```
src/models/product.ts  →  tests/products.test.ts
src/models/order.ts    →  tests/orders.test.ts
src/routes/products.ts →  tests/products-routes.test.ts  (if needed)
```

## What to test
- **Validation schemas**: happy path + edge cases (empty strings, negative numbers, invalid enums)
- **Route handlers**: response status codes, response body shape, error cases
- **Utils**: pure functions, helpers

## Naming
Use descriptive names: `"rejects negative price"`, not `"test case 3"`.

## Coverage expectations
Every new endpoint or schema must have tests before the PR is opened.
Minimum: happy path + 2 edge cases + 1 error case.
