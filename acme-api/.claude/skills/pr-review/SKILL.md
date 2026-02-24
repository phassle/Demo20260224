---
name: pr-review
description: Reviews pull requests according to the team's code review checklist. Activates when discussing PRs, code review, or merge requests.
---

# PR Review Skill

Review the PR using our team checklist:

## Checklist
- [ ] All new endpoints have Zod validation
- [ ] No `any` types introduced
- [ ] Tests cover happy path + edge cases
- [ ] Error responses use `{ error: "..." }` format
- [ ] No hardcoded values (use config/env)
- [ ] Filenames follow kebab-case
- [ ] No console.log left in production code
- [ ] Commit messages in imperative mood

## Output format
Give a summary with ✅ / ⚠️ / ❌ for each item.
End with: "Approve" / "Request changes" / "Needs discussion".
