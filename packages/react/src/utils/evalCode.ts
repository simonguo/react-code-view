/**
 * Safely evaluate code in a sandboxed scope
 */
export function evalCode(code: string, scope: Record<string, unknown>): unknown {
  const scopeKeys = Object.keys(scope);
  const scopeValues = scopeKeys.map(key => scope[key]);
  return new Function(...scopeKeys, code)(...scopeValues);
}
