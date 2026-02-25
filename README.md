# Workshop Demo — Acme Webshop API

Demo project for the **Agentic Development** workshop (Day 2).
Everything you need is in `acme-api/`.

## Quick setup

```bash
cd acme-api
npm install
just verify      # should pass lint + typecheck + 7 tests
npm run dev      # starts on localhost:3000
```

## Workshop 1: Automate, integrate & scale (09:00–10:15)

### Skills & Hooks

Skills are the modern way to teach your AI colleague routines. A skill is a folder with `SKILL.md` as entry point + supporting files.

| What | Where | Try it |
|------|-------|--------|
| Rich skill folder | `.claude/skills/review/` | `/review src/routes/products.ts` |
| Frontmatter control | `.claude/skills/plan-feature/SKILL.md` | `/plan-feature discount codes` |
| Dynamic context | `.claude/skills/pr-summary/SKILL.md` | Open a PR → `/pr-summary` |
| Sub-agent skill | `.claude/skills/deep-research/SKILL.md` | Ask about a topic → auto-activates |
| Old-style commands | `.claude/commands/` | Same slash commands, still work |
| PostToolUse hook | `.claude/settings.json` | Edit a file → ESLint runs automatically |
| Stop hook | `.claude/settings.json` | Agent finishes → `just verify` runs |

### Three layers of control

```
Justfile   →  defines WHAT can be done     (deterministic)
CLAUDE.md  →  tells WHEN to do it          (guidance)
Hooks      →  FORCES it to happen          (automatic)
```

### MCP — Give your AI colleague access to your systems

```bash
/mcp add github          # then: "Show all open PRs against main"
```

## Workshop 2: Specs, quality & multi-agent (10:30–11:30)

### Boris workflow — Plan → Implement → Simplify → Verify

```
1. /plan-feature discount codes
   → Agent produces multi-phase plan → you approve

2. /generate-tests discount codes
   → TDD: RED (one failing test) → GREEN (make it pass) → repeat

3. /simplify src/routes/discounts.ts
   → Remove over-engineering → tests stay green

4. just verify
   → lint + typecheck + test
```

### Issue-first workflow

Start from a GitHub Issue, plan it, work phase by phase:

```
"Get issue #12 and plan the implementation"     → Agent reads issue + CLAUDE.md
/save-plan #12                                   → Writes phases back as checkboxes
... implement phase by phase ...
/save-plan #12                                   → Update progress after each phase
```

### Multi-agent

```bash
# Planner agent — creates a GitHub Issue from a plan
claude --agent planner "Add discount codes"

# Three agents in parallel, each in its own worktree
Terminal 1: claude -w feat-api    "Implement /api/users"
Terminal 2: claude -w feat-test   "Write integration tests"
Terminal 3: claude -w feat-docs   "Generate API docs"
```

## Example prompts to try

Copy-paste into Claude Code.

### Simple task (shows CLAUDE.md in action)
```
Add a DELETE endpoint for products by ID. Return 404 if not found.
```

### Boris workflow — full cycle
```
/plan-feature Add discount codes with percentage and fixed amount types, plus expiry dates
```

### Bug fix (shows agent investigating)
```
Bug fix: POST /api/orders accepts an empty items array.
It should require at least one item.
```

### Multi-phase plan (shows context window management)
```
Add a full customer management system: CRUD endpoints, search by email,
order history per customer, and a stats endpoint showing top customers.
```

### Slash command demo
```
/review src/routes/products.ts
```

```
/generate-tests src/routes/orders.ts
```

## Important: known bugs (for demo purposes!)

The demo app has an intentional bug that's used during the workshop:

- **POST /api/orders accepts empty items array** — `CreateOrderSchema` uses `z.array()` without `.min(1)`. The agent should find and fix this during the bug fix demo.

## File structure

```
.claude/                                ← Claude Code config (root level)
│   ├── skills/                         ← Skills (modern — with frontmatter)
│   │   ├── plan-feature/SKILL.md       ← /plan-feature — Boris Plan phase
│   │   ├── generate-tests/SKILL.md     ← /generate-tests — Boris Implement phase
│   │   ├── simplify/SKILL.md           ← /simplify — Boris Simplify phase
│   │   ├── review/                     ← /review — with examples/ subfolder
│   │   │   ├── SKILL.md
│   │   │   └── examples/good-review.md
│   │   ├── save-plan/SKILL.md          ← /save-plan — save plan as GitHub Issue
│   │   ├── commit-push-pr/SKILL.md     ← /commit-push-pr — ship it
│   │   ├── tdd/SKILL.md               ← Auto-activates on new features
│   │   ├── pr-review/SKILL.md         ← Auto-activates on PR discussions
│   │   ├── pr-summary/SKILL.md        ← Dynamic context: !`gh pr diff`
│   │   └── deep-research/SKILL.md     ← Sub-agent: context: fork + agent: Explore
│   ├── commands/                       ← Old-style commands (still work!)
│   ├── agents/
│   │   ├── planner.md                  ← Creates GitHub Issues from plans
│   │   ├── simplifier.md              ← Simplify phase: refactor + clean up
│   │   └── reviewer.md                ← Verify phase reviewer
│   ├── rules/                          ← Auto-loaded reference docs
│   │   ├── architecture.md
│   │   └── testing.md
│   └── settings.json                   ← Hooks + permissions (deny list)
acme-api/
├── CLAUDE.md                           ← Agent's onboarding (Boris workflow + rules)
├── justfile                            ← Deterministic recipes (just verify)
├── src/
│   ├── index.ts                        ← Entry point + health check
│   ├── routes/                         ← API routes (products, orders)
│   └── models/                         ← Zod schemas + types
└── tests/                              ← Vitest tests (10 passing)
```
