import React, { useCallback, useState, useEffect, useRef } from 'react';
import { transform as transformCode, type Options } from 'sucrase';
import { canUseDOM, evalCode } from '../utils';

const ReactModule = React;

export interface UseCodeExecutionOptions {
  /** Dependencies to inject into the code scope */
  dependencies?: Record<string, unknown>;

  /** Sucrase transform options */
  transformOptions?: Options;

  /** Transform code before compilation */
  beforeCompile?: (code: string) => string;

  /** Transform code after compilation */
  afterCompile?: (code: string) => string;

  /** Callback when an error occurs */
  onError?: (error: Error) => void;
}

const defaultTransformOptions: Options = { transforms: ['jsx'] };

/**
 * Hook for executing code and capturing the rendered element
 */
export function useCodeExecution(initialCode: string, options: UseCodeExecutionOptions = {}) {
  const {
    dependencies = {},
    transformOptions = defaultTransformOptions,
    beforeCompile,
    afterCompile,
    onError
  } = options;

  const [element, setElement] = useState<React.ReactNode>(null);
  const [error, setError] = useState<Error | null>(null);
  const [code, setCode] = useState(initialCode);

  // Keep latest options in refs to avoid unstable dependencies causing re-renders
  const dependenciesRef = useRef(dependencies);
  const transformOptionsRef = useRef(transformOptions);
  const beforeCompileRef = useRef<typeof beforeCompile>(beforeCompile);
  const afterCompileRef = useRef<typeof afterCompile>(afterCompile);
  const onErrorRef = useRef<typeof onError>(onError);

  useEffect(() => {
    dependenciesRef.current = dependencies;
  }, [dependencies]);

  useEffect(() => {
    transformOptionsRef.current = transformOptions;
  }, [transformOptions]);

  useEffect(() => {
    beforeCompileRef.current = beforeCompile;
  }, [beforeCompile]);

  useEffect(() => {
    afterCompileRef.current = afterCompile;
  }, [afterCompile]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  const execute = useCallback(
    (codeToExecute: string) => {
      if (!canUseDOM) {
        return;
      }

      // Clear previous error
      setError(null);

      try {
        // Apply beforeCompile transform
        const preProcessedCode = beforeCompileRef.current?.(codeToExecute) || codeToExecute;

        // Transform JSX to JS
        const { code: compiledCode } = transformCode(preProcessedCode, transformOptionsRef.current);

        // Apply afterCompile transform
        const finalCode = afterCompileRef.current?.(compiledCode) || compiledCode;

        // Create a custom render function to capture the element
        let capturedElement: React.ReactNode = null;
        const customRender = (el: React.ReactNode) => {
          capturedElement = el;
          return el;
        };

        // Execute the code with dependencies
        evalCode(finalCode, {
          React: ReactModule,
          ReactDOM: { render: customRender },
          render: customRender,
          ...dependenciesRef.current
        });

        // Update state with captured element
        if (capturedElement !== null) {
          setElement(capturedElement);
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        onErrorRef.current?.(error);
        console.error('[react-code-view] Code execution error:', error);
      }
    },
    []
  );

  // Execute initial code
  useEffect(() => {
    execute(code);
  }, [code, execute]);

  return {
    element,
    error,
    code,
    setCode,
    // keep backward-compatible alias for tests and external usage
    updateCode: setCode,
    execute
  };
}
