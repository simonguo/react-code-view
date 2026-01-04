# Codecov Setup Guide

This project uses [Codecov](https://codecov.io/) for test coverage reporting.

## 📊 Coverage Status

[![codecov](https://codecov.io/gh/simonguo/react-code-view/branch/main/graph/badge.svg)](https://codecov.io/gh/simonguo/react-code-view)

## 🚀 Setup Instructions

### 1. Enable Codecov for Your Repository

1. Go to [codecov.io](https://codecov.io/)
2. Sign in with your GitHub account
3. Add your repository `simonguo/react-code-view`
4. Get your upload token from the repository settings

### 2. Add Codecov Token to GitHub Secrets

1. Go to your GitHub repository settings
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `CODECOV_TOKEN`
5. Value: `8940f287-54c0-4594-ae35-d9379d71c3f0`
6. Click **Add secret**

> **Note**: The token is already configured for this repository.

### 3. Coverage Reports

Coverage reports are automatically generated and uploaded on:
- Every push to `main` branch
- Every pull request to `main` branch

## 📈 Local Coverage Generation

Generate coverage reports locally:

```bash
# Generate coverage for all packages
pnpm test:coverage

# View HTML coverage reports
open packages/core/coverage/index.html
open packages/react/coverage/index.html
open packages/unplugin/coverage/index.html
```

## 📝 Coverage Configuration

Coverage settings are configured in:
- `codecov.yml` - Codecov-specific configuration
- `packages/*/vitest.config.ts` - Test coverage settings per package

### Current Coverage Targets

- **Project coverage**: Auto (with 1% threshold)
- **Patch coverage**: Auto (with 1% threshold)
- **Precision**: 2 decimal places
- **Range**: 70-100%

## 🔍 What's Covered

All packages have comprehensive test coverage:

- **@react-code-view/core**: Core markdown transformation and syntax highlighting
- **@react-code-view/react**: React components and hooks
- **@react-code-view/unplugin**: Build tool plugins (Vite, Webpack, Rollup, etc.)

## 🚫 Ignored Files

The following files are excluded from coverage:
- Test files (`**/*.test.ts`, `**/*.test.tsx`)
- Type definitions (`**/*.d.ts`)
- Configuration files (`**/*.config.*`)
- Distribution files (`**/dist/**`)
- Node modules (`**/node_modules/**`)
- Index files (`**/index.ts`)
- Icon files (`packages/react/src/icons/**`)
- Examples (`examples/**`)
- Documentation (`docs/**`)

## 📊 Coverage Reports

Coverage reports include:
- **Text**: Console output during test runs
- **JSON**: Machine-readable format
- **HTML**: Interactive browser-based reports
- **LCOV**: Standard format for Codecov upload

## 🔗 Useful Links

- [Codecov Dashboard](https://codecov.io/gh/simonguo/react-code-view)
- [Codecov Documentation](https://docs.codecov.com/)
- [GitHub Actions Workflow](.github/workflows/nodejs-ci.yml)
