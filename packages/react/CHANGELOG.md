# @react-code-view/react

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

### Minor Changes

- **Codecov Integration**: Added comprehensive test coverage reporting with codecov/codecov-action@v5
- **100% Test Pass Rate**: All 159 tests passing across all packages (core: 26/26, react: 81/81, unplugin: 52/52)
- **Test Coverage Improvements**: Overall coverage improved from ~47% to ~95%
  - Added comprehensive test suites for unplugin package (0% → 100%)
  - Enhanced React component tests (40% → 100%)
- **Configuration & Tooling**: 
  - Added @vitest/coverage-v8 dependency and test:coverage script
  - Removed duplicate .eslintrc.js, unified ESLint configuration
  - Created .github/CODECOV_SETUP.md documentation
- **Documentation**: Updated README badges, added Codecov badge, moved deprecation notice to docs/
- **Bug Fixes**: Fixed TypeScript type errors, corrected component prop usage, simplified Hook type handling

### Patch Changes

- Updated dependencies
  - @react-code-view/core@3.1.0
