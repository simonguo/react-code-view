# NPM Deprecation Commands for react-code-view

## 🚨 Important: Run these commands to deprecate the package on npm

After merging the PR that removes the `react-code-view` package, run the following commands to deprecate it on npm:

### Deprecate all versions

```bash
# Deprecate all versions of react-code-view
npm deprecate react-code-view "Package deprecated. Please use @react-code-view/react instead. See https://github.com/simonguo/react-code-view/blob/main/docs/DEPRECATION_react-code-view.md for migration guide."
```

### Deprecate specific version ranges (alternative)

If you prefer to deprecate specific versions:

```bash
# Deprecate v3.x versions
npm deprecate react-code-view@3.x "Package deprecated. Please use @react-code-view/react instead. See https://github.com/simonguo/react-code-view/blob/main/docs/DEPRECATION_react-code-view.md for migration guide."

# Deprecate v2.x versions (if needed)
npm deprecate react-code-view@2.x "Package deprecated. Please use @react-code-view/react instead. See https://github.com/simonguo/react-code-view/blob/main/docs/DEPRECATION_react-code-view.md for migration guide."
```

## 📋 Verification

After running the deprecation command, verify it worked:

```bash
npm view react-code-view
```

You should see a deprecation warning in the output.

## 📝 Notes

- Deprecation does NOT unpublish the package - it remains available for existing users
- Users will see a warning when installing: `npm WARN deprecated react-code-view@x.x.x: Package deprecated...`
- The package will still be installable, but users are encouraged to migrate
- According to npm policy, you should NOT unpublish packages that others depend on

## 🔗 References

- npm deprecate documentation: https://docs.npmjs.com/cli/v10/commands/npm-deprecate
- npm unpublish policy: https://docs.npmjs.com/policies/unpublish
- Migration guide: [docs/DEPRECATION_react-code-view.md](./docs/DEPRECATION_react-code-view.md)
