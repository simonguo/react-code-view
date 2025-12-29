import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCodeExecution } from '../hooks/useCodeExecution';

describe('useCodeExecution (basic)', () => {
  it('should execute simple JavaScript code', () => {
    const code = `const App = () => <div>Hello</div>; return <App />;`;
    const { result } = renderHook(() =>
      useCodeExecution(code, {
        dependencies: { React: { createElement: vi.fn() } }
      })
    );
    expect(result.current.error).toBeNull();
  });

  it('should handle empty code', () => {
    const { result } = renderHook(() => useCodeExecution(''));
    expect(result.current.error).toBeNull();
  });

  it('should capture execution errors', () => {
    const code = 'throw new Error("Test error");';
    const onError = vi.fn();
    const { result } = renderHook(() =>
      useCodeExecution(code, { onError })
    );
    expect(result.current.error).toBeTruthy();
    expect(onError).toHaveBeenCalled();
  });
});
