Generate tests for $ARGUMENTS using TDD.

Process — one test at a time:
1. RED — Write ONE failing test. Run `just test`. Confirm it fails.
2. GREEN — Write minimal code to pass. Run `just test`. Confirm green.
3. Repeat for next behavior.

Rules:
- Use Vitest (import from "vitest")
- Place tests in tests/ mirroring the src/ structure
- Cover: happy path + at least 2 edge cases + 1 error case
- Use descriptive test names: "rejects empty name", not "test 3"
- Run `just verify` when done.
