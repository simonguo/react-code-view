import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCodeExecution } from '../hooks/useCodeExecution';

describe('useCodeExecution', () => {
  it('should execute simple JavaScript code', () => {
    const code = `
      const App = () => <div>Hello World</div>;
      return <App />;
    `;

    const { result } = renderHook(() =>
      useCodeExecution(code, {
        dependencies: { React: { createElement: vi.fn() } }
      })
    );

    expect(result.current.error).toBeNull();
  });

  it('should handle TypeScript code with proper transforms', () => {
    const code = `
      const App: React.FC = () => <div>TypeScript</div>;
      return <App />;
    `;

    const { result } = renderHook(() =>
      useCodeExecution(code, {
        transformOptions: { transforms: ['typescript', 'jsx'] },
        dependencies: { React: { createElement: vi.fn() } }
      })
    );

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

  it('should update when code changes', () => {
    const { result } = renderHook(
      ({ code }) => useCodeExecution(code),
      { initialProps: { code: 'const a = 1;' } }
    );

    act(() => {
      result.current.updateCode('const b = 2;');
    });

    expect(result.current.code).toBe('const b = 2;');
  });

  it('should inject dependencies into execution scope', () => {
    const mockDep = vi.fn();
    const code = 'customFunction(); return null;';

    renderHook(() =>
      useCodeExecution(code, {
        dependencies: { customFunction: mockDep }
      })
    );

    expect(mockDep).toHaveBeenCalled();
  });

  it('should apply beforeCompile transformation', () => {
    const code = 'const a = 1;';
    const beforeCompile = vi.fn((c) => `/* compiled */\n${c}`);

    renderHook(() =>
      useCodeExecution(code, { beforeCompile })
    );

    expect(beforeCompile).toHaveBeenCalledWith(code);
  });

  it('should apply afterCompile transformation', () => {
    const code = 'const a = 1;';
    const afterCompile = vi.fn((c) => c);

    renderHook(() =>
      useCodeExecution(code, { afterCompile })
    );

    expect(afterCompile).toHaveBeenCalled();
  });

  it('should handle empty code', () => {
    const { result } = renderHook(() => useCodeExecution(''));

    expect(result.current.error).toBeNull();
  });

  it('should clear previous error on successful execution', () => {
    const { result } = renderHook(
      ({ code }) => useCodeExecution(code),
      { initialProps: { code: 'throw new Error("error");' } }
    );

    expect(result.current.error).toBeTruthy();

    act(() => {
      result.current.updateCode('const a = 1;');
    });

    expect(result.current.error).toBeNull();
  });
});
