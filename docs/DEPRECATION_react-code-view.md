# Deprecation Notice: `react-code-view` Package

## ⚠️ Status: DEPRECATED

The `react-code-view` package has been **deprecated** and is no longer maintained.

## 🔄 Migration Required

Please migrate to **`@react-code-view/react`** instead.

### Why?

The `react-code-view` package was a convenience wrapper that re-exported everything from `@react-code-view/react` and `@react-code-view/core`. To simplify the architecture and reduce maintenance overhead, we've decided to deprecate this wrapper package.

### What to do?

**1. Update your package.json:**

```bash
# Remove old package
npm uninstall react-code-view

# Install new package
npm install @react-code-view/react
```

**2. Update your imports:**

```tsx
// Before (deprecated)
import { CodeView } from 'react-code-view';
import 'react-code-view/styles';

// After (recommended)
import { CodeView } from '@react-code-view/react';
import '@react-code-view/react/styles';
```

**3. That's it!**

All APIs remain the same - only the package name changes.

## 📦 New Package Structure

| Package | Purpose |
|---------|---------|
| `@react-code-view/react` | React components (main package) |
| `@react-code-view/core` | Core utilities (usually not needed directly) |
| `@react-code-view/unplugin` | Build tool plugins for markdown imports |

## 🔗 Resources

- **Documentation**: https://rcv-rsuite.vercel.app/
- **GitHub**: https://github.com/simonguo/react-code-view
- **npm**: https://www.npmjs.com/package/@react-code-view/react

## ⏰ Timeline

- **v3.0.0** (Dec 2025): `react-code-view` package deprecated
- **v4.0.0** (Future): Package will no longer be published

## 💬 Questions?

If you have any questions or need help migrating, please [open an issue](https://github.com/simonguo/react-code-view/issues).
