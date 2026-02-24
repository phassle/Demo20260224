Save or update a plan as a GitHub Issue.

If $ARGUMENTS is empty: create a new issue from the current plan.
If $ARGUMENTS is an issue number (e.g. #12): update that issue with current progress.

Steps:
1. Extract phases from conversation (or read existing issue)
2. Format with checkboxes: - [x] done / - [ ] remaining
3. Create or update: gh issue create/edit
4. If updating: add a comment summarizing what changed
5. Report the issue URL
