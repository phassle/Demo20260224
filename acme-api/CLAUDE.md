# Acme Webshop API

## About
REST API for the Acme Webshop. TypeScript + Fastify + Zod validation. Vitest for testing.

## Commands
- Dev server: `npm run dev`
- Run tests: `just test`
- Verify all: `just verify` (lint + typecheck + test)
- Build: `npm run build`

## Workflow — Plan → Implement → Simplify → Verify

Follow this cycle for every feature or bug fix:

1. **Plan** — Use Plan Mode (Shift+Tab). Break into phases. Get approval before writing code.
2. **Implement** — TDD: one failing test → make it pass → repeat. Never write multiple tests at once.
3. **Simplify** — Remove over-engineering, improve names, reduce duplication. All tests must stay green.
4. **Verify** — Run `just verify`. Fix anything that fails. Do not skip this step.

## Rules
- Be extremely concise. Sacrifice grammar for concision.
- Always validate input with Zod schemas (never trust raw request.body)
- Use kebab-case for filenames (e.g. `order-status.ts`, not `orderStatus.ts`)
- Never use `any` — always define proper types
- Every new endpoint MUST have tests before the PR is opened
- Use `reply.status(4xx).send({ error: "..." })` for error responses — never throw raw errors
- Run `just verify` before every commit

## Architecture
```
src/
├── index.ts          ← App entry point, registers routes
├── routes/           ← One file per resource (products.ts, orders.ts)
├── models/           ← Zod schemas + TypeScript types
└── utils/            ← Shared helpers
tests/                ← Mirror of src/ structure
```

## Git workflow
- Feature branches: `feature/description`
- Commit messages: imperative mood ("Add endpoint", not "Added endpoint")
- Always run `just verify` before committing

## Additional docs
- See `../.claude/rules/architecture.md` for route patterns, validation patterns, error conventions
- See `../.claude/rules/testing.md` for test framework, naming, coverage expectations
