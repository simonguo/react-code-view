---
"react-code-view": major
"@react-code-view/react": major
"@react-code-view/core": major
"@react-code-view/unplugin": major
---

Major refactor for v3.0.0:

- Hook: stabilize `useCodeExecution` (refs-based options, stable `execute()`, `updateCode` alias)
- Tests: fix TypeScript matcher types and marked renderer signature; remove unused vars
- Docs: update README with requirements, hook example, CI/CD notes
- CI: Node 18 + PNPM, caching; gh-pages publishes `docs/dist`
- Publish: adopt Changesets + npm provenance (OIDC), drop `NODE_AUTH_TOKEN`
- Config: align workspace tsconfig/turbo/vite

BREAKING CHANGES:

- `useCodeExecution` effect behavior stabilized; consumers relying on previous implicit re-execution may need to explicitly update `code` or pass `dependencies`
- Package structure reorganized across `packages/*`; import paths may need updates according to exports
