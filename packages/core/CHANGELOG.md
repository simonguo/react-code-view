# @react-code-view/core

## 4.0.0

### Major Changes

- 308881b: Major refactor for v3.0.0:
  - Hook: stabilize `useCodeExecution` (refs-based options, stable `execute()`, `updateCode` alias)
  - Tests: fix TypeScript matcher types and marked renderer signature; remove unused vars
  - Docs: update README with requirements, hook example, CI/CD notes
  - CI: Node 18 + PNPM, caching; gh-pages publishes `docs/dist`
  - Publish: adopt Changesets + npm provenance (OIDC), drop `NODE_AUTH_TOKEN`
  - Config: align workspace tsconfig/turbo/vite

  BREAKING CHANGES:
  - `useCodeExecution` effect behavior stabilized; consumers relying on previous implicit re-execution may need to explicitly update `code` or pass `dependencies`
  - Package structure reorganized across `packages/*`; import paths may need updates according to exports
  - Imports: `CodeView` is now also a default export in `@react-code-view/react` and re-exported by `react-code-view`; prefer `import CodeView from 'react-code-view'` or adjust named imports accordingly
  - Styles: Less entries were removed; switch to `import 'react-code-view/styles'` and optional `import 'react-code-view/styles/highlight'`
  - Build integration: Legacy `webpack-md-loader` is removed; migrate to unified `@react-code-view/unplugin` for Vite/Webpack/Rollup/esbuild/Rspack
  - Tooling: Minimum requirements updated to Node >=18 and PNPM >=8 for the monorepo/dev workflow
