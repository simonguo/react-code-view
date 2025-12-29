# Contributing to React Code View

Thanks for helping improve React Code View! This guide keeps contributions consistent and easy to review.

## Prerequisites
- Node.js 18+
- PNPM 9 (Corepack enabled: `corepack enable`)
- Git

## Setup
```bash
corepack enable
pnpm install
```

## Common Tasks
- Typecheck: `pnpm -w typecheck`
- Lint: `pnpm -w lint`
- Test: `pnpm -w test`
- Build: `pnpm -w build`
- Docs dev: `pnpm docs`
- Docs build: `pnpm docs:build`

## Development Notes
- Monorepo is managed with PNPM + Turbo; prefer `pnpm -w <script>` for workspace-wide tasks.
- Avoid committing generated bundles in `dist/`; keep changes to source and configs.
- Ensure tests pass locally before opening a PR.
- Update or add tests for behavior changes (see `packages/**/__tests__`).

## Changesets & Releases
- For user-visible changes, run `pnpm changeset` and follow the prompts (choose the affected packages and bump type).
- Keep the summary short and mention breaking changes clearly.
- Versioning and publishing are handled via CI; tags trigger the publish workflow.

## Pull Requests
- Base your work on the latest `main` (or the active release branch) and keep commits focused.
- Describe the change, rationale, and testing performed.
- If you add a new feature or breaking change, update `README.md` and relevant docs.

## Coding Style
- TypeScript everywhere; prefer explicit types on public APIs.
- React 18 conventions (hooks, function components).
- Keep imports sorted logically; run linters/formatters as needed.

## Need Help?
- Open a discussion or issue in the repo with reproduction steps and context.
