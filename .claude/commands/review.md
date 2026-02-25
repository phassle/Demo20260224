Review the code in $ARGUMENTS:

1. Check for security issues (SQL injection, missing validation, exposed secrets)
2. Verify that tests exist and cover edge cases
3. Check for missing error handling
4. Verify TypeScript types are correct (no `any`)
5. Check that Zod schemas are used for all input

Summarize findings: ✅ good / ⚠️ warning / ❌ must fix.
