# Release Notes — v3.0.0 (2025-12-29)

A major overhaul that migrates `react-code-view` into a PNPM/Turbo monorepo, unifies build integrations, and refreshes the API/docs. This release is **breaking** compared to 2.6.1. Usage examples below follow the latest README/docs.

## Highlights
- Monorepo migration with PNPM + Turbo; updated CI (Node 18+, caching, docs from `docs/dist`).
- Unified build plugin: new `@react-code-view/unplugin` for Vite/Webpack/Rollup/esbuild/Rspack.
- Imports simplified: `CodeView` is the default export from `@react-code-view/react`; re-exported via `react-code-view` if needed.
- Styles streamlined: use `import '@react-code-view/react/styles/index.css'` (CSS). Legacy Less entries removed.
- `useCodeExecution` stabilized: stable `execute` ref and `updateCode` alias; hook examples refreshed.
- Docs rewritten (installation, usage, migration) and Changesets added for versioning.

## Breaking Changes
- **Tooling requirements:** Node >= 18, PNPM >= 8 (dev workflow). Update CI to match.
- **Imports:** Prefer `import CodeView from 'react-code-view'`; adjust named imports if you targeted old paths.
- **Styles:** Switch to CSS entries: `import 'react-code-view/styles'` (or specific CSS files). Remove Less imports.
- **Build integration:** Legacy `webpack-md-loader` removed. Use the unified unplugin instead.

## Migration Guide (v2.6.1 → v3.0.0)
Use `@react-code-view/react` as the primary entry and the new unplugin across bundlers.

1) **Install**
   ```bash
   pnpm add @react-code-view/react @react-code-view/unplugin
   ```

2) **Imports**
   ```tsx
   import CodeView from '@react-code-view/react';
   import { Renderer, MarkdownRenderer } from '@react-code-view/react';
   // (Optional) re-exported convenience:
   // import CodeView from 'react-code-view';
   ```

3) **Styles (CSS)**
   ```tsx
   import '@react-code-view/react/styles/index.css';
   ```

4) **Build plugin (Vite example)**
   ```js
   // vite.config.js
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';
   import reactCodeView from '@react-code-view/unplugin/vite';

   export default defineConfig({
     plugins: [react(), reactCodeView()]
   });
   ```
   Webpack: `@react-code-view/unplugin/webpack`  
   Rollup: `@react-code-view/unplugin/rollup`  
   esbuild: `@react-code-view/unplugin/esbuild`  
   Rspack: `@react-code-view/unplugin/rspack`

5) **Hook usage (`useCodeExecution`)**
   ```tsx
   import { useCodeExecution } from '@react-code-view/react';

   const { element, error, code, updateCode, execute } = useCodeExecution(
     initialCode,
     {
       dependencies: { Button },
       transformOptions: { transforms: ['typescript', 'jsx'] },
       beforeCompile: (c) => c.trim(),
       afterCompile: (c) => c,
       onError: (e) => console.error('Execution error:', e)
     }
   );
   ```

6) **Remove legacy `webpack-md-loader`**
   - Replace with the unified unplugin (see entries above).

## Feature Details
- Monorepo structure with Changesets-driven versioning and consistent lint/format configs.
- `useCodeExecution` stability improvements and docs examples (matches latest README snippets).
- README/docs updated for new package layout, usage, and migration steps.
- CI updated to use PNPM via Corepack; gh-pages publishes `docs/dist`.

## Links
- PR: https://github.com/simonguo/react-code-view/pull/59
- npm v3.0.0: https://www.npmjs.com/package/react-code-view/v/3.0.0
- v2.6.1 (previous): https://www.npmjs.com/package/react-code-view/v/2.6.1
