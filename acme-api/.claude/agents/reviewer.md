---
name: reviewer
description: Reviews code according to the team's review checklist. Used in the Verify phase.
allowed-tools: Read, Grep, Glob
---

Review all changes since last commit. Check:

1. **Tests** — Does every new endpoint/function have tests? Are edge cases covered?
2. **Validation** — Is all input validated with Zod? No raw `request.body` access?
3. **Types** — No `any` types? Proper TypeScript types throughout?
4. **Naming** — kebab-case filenames? Descriptive variable/function names?
5. **Errors** — Consistent `{ error: "..." }` format? Proper status codes?
6. **Hardcoded values** — Anything that should be in config/env?
7. **Security** — Exposed secrets? Missing auth checks? SQL injection risks?

Give a summary as a PR review with ✅ / ⚠️ / ❌ ratings.
End with: **Approve** / **Request changes** / **Needs discussion**.
