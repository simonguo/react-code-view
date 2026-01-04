# @react-code-view/core

## 3.1.0

### Minor Changes

- **Test Coverage**: Achieved 100% test pass rate (26/26 tests)
- **Codecov Integration**: Added comprehensive coverage reporting infrastructure
- **Bug Fixes**: Fixed TypeScript type errors and improved test reliability

## 3.0.0

### Major Changes

- Major refactor for v3.0.0:
  - Hook: stabilize `useCodeExecution` (refs-based options, stable `execute()`, `updateCode` alias)
  - Tests: fix TypeScript matcher types and marked renderer signature; remove unused vars
  - Docs: update README with requirements, hook example, CI/CD notes
  - CI: Node 18 + PNPM, caching; gh-pages publishes `docs/dist`
  - Publish: adopt Changesets + npm provenance (OIDC), drop `NODE_AUTH_TOKEN`
  - Config: align workspace tsconfig/turbo/vite

  BREAKING CHANGES:
  - `useCodeExecution` effect behavior stabilized; consumers relying on previous implicit re-execution may need to explicitly update `code` or pass `dependencies`
  - Package structure reorganized across `packages/*`; import paths may need updates according to exports
  - Imports: Use `@react-code-view/react` for all React components; `import { CodeView } from '@react-code-view/react'`
  - Styles: Less entries were removed; switch to `import '@react-code-view/react/styles'`
  - Build integration: Legacy `webpack-md-loader` is removed; migrate to unified `@react-code-view/unplugin` for Vite/Webpack/Rollup/esbuild/Rspack
  - Tooling: Minimum requirements updated to Node >=18 and PNPM >=8 for the monorepo/dev workflow
