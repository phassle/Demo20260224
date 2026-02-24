---
name: review
description: Reviews code for security, tests, and conventions
argument-hint: [file-or-directory]
disable-model-invocation: true
allowed-tools: Read, Grep, Glob
---

# Code review

Review the code in $ARGUMENTS using the checklist below.

## Checklist

Refer to `examples/good-review.md` for what a good review looks like.

- [ ] All new endpoints have Zod validation
- [ ] No `any` types introduced
- [ ] Tests cover happy path + edge cases
- [ ] Error responses use `{ error: "..." }` format
- [ ] No hardcoded values (use config/env)
- [ ] Filenames follow kebab-case
- [ ] No console.log left in production code
- [ ] No security issues (SQL injection, missing validation, exposed secrets)

## Output

Summarize findings: ✅ good / ⚠️ warning / ❌ must fix

End with: **Approve** / **Request changes** / **Needs discussion**.
