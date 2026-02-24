---
name: generate-tests
description: Generates tests using TDD red-green-refactor (Boris Implement phase)
argument-hint: [file-path]
---

# Generate tests — TDD process

Generate tests for: $ARGUMENTS

## Process — one test at a time

For each behavior:

1. **RED** — Write ONE failing test. Run `just test`. Confirm it fails.
2. **GREEN** — Write the minimal code to make that ONE test pass. Run `just test`. Confirm green.
3. Repeat for the next behavior.

## Rules

- Only ONE test at a time. Do not write multiple tests before implementing.
- Each test should verify one specific behavior.
- Do not modify tests to make them pass — modify the implementation.
- Use Vitest (import from "vitest")
- Place tests in tests/ mirroring the src/ structure
- Cover: happy path + at least 2 edge cases + 1 error case
- Use descriptive test names: "rejects empty name", not "test 3"

## After all behaviors are implemented

- Run `just verify` to confirm everything passes
- Look for refactor candidates: duplication, unclear names, unnecessary complexity
