Commit all changes, push, and create a PR.

Steps:
1. Run `just verify` — if it fails, fix the issues first
2. Stage all relevant changes (not node_modules, not .env)
3. Write a commit message in imperative mood ("Add X", "Fix Y")
4. Push to the current feature branch
5. Create a PR with:
   - Title: short summary of what changed
   - Body: what was added/changed and why
   - Link to related issue if there is one
