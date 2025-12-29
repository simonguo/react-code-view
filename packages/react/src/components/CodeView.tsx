import React, { useState, useCallback, useMemo, useEffect } from 'react';
import type { Options as SucraseOptions } from 'sucrase';
import { ErrorBoundary } from './ErrorBoundary';
import { Preview } from './Preview';
import { CodeEditor } from './CodeEditor';
import { Renderer } from './Renderer';
import { CopyCodeButton } from './CopyCodeButton';
import { CodeIcon } from '../icons';
import { useCodeExecution } from '../hooks';
import { canUseDOM } from '../utils';

export interface CodeViewProps {
  /** Source code to display and optionally execute */
  children?: string;

  /** Dependencies to inject into the code execution scope */
  dependencies?: Record<string, unknown>;

  /** Programming language for syntax highlighting */
  language?: string;

  /** Whether the code is editable */
  editable?: boolean;

  /** Whether to render the code preview */
  renderPreview?: boolean;

  /** Show line numbers in code view */
  showLineNumbers?: boolean;

  /** Show copy button */
  showCopyButton?: boolean;

  /** Initially show code (default: false) */
  defaultShowCode?: boolean;

  /** Custom theme className */
  theme?: string;

  /** Transform code before compilation */
  beforeCompile?: (code: string) => string;

  /** Transform code after compilation */
  afterCompile?: (code: string) => string;

  /** Sucrase transform options */
  compilerOptions?: SucraseOptions;

  /** Callback when code changes */
  onChange?: (code: string) => void;

  /** Callback when an error occurs */
  onError?: (error: Error) => void;

  /** Custom className */
  className?: string;

  /** Custom style */
  style?: React.CSSProperties;

  /** Content to display when preview is empty */
  emptyPreviewContent?: React.ReactNode;
}

/**
 * CodeView - Main component for displaying and optionally executing React code
 *
 * @example
 * ```jsx
 * import CodeView from '@react-code-view/react';
 *
 * <CodeView dependencies={{ Button }} language="jsx">
 *   {`<Button>Click me</Button>`}
 * </CodeView>
 * ```
 */
export const CodeView = React.memo<CodeViewProps>(
  ({
    children = '',
    dependencies = {},
    language = 'jsx',
    editable = true,
    renderPreview = true,
    showCopyButton = true,
    defaultShowCode = false,
    theme = 'rcv-theme-default',
    beforeCompile,
    afterCompile,
    compilerOptions,
    onChange,
    onError,
    className = '',
    style,
    emptyPreviewContent
  }) => {
    const [showCode, setShowCode] = useState(defaultShowCode);

    // Use the code execution hook
    const { element, error, code, setCode, execute } = useCodeExecution(children, {
      dependencies,
      transformOptions: compilerOptions,
      beforeCompile,
      afterCompile,
      onError
    });

    // Handle code changes
    const handleCodeChange = useCallback(
      (newCode: string) => {
        setCode(newCode);
        onChange?.(newCode);
      },
      [setCode, onChange]
    );

    // Toggle code visibility
    const toggleCode = useCallback(() => {
      setShowCode(prev => !prev);
    }, []);

    // Re-execute when code changes
    useEffect(() => {
      if (canUseDOM && code) {
        execute(code);
      }
    }, [code, execute]);

    const containerClassName = useMemo(
      () =>
        [
          'rcv-code-view',
          theme,
          showCode && 'rcv-code-view--code-visible',
          error && 'rcv-code-view--has-error',
          className
        ]
          .filter(Boolean)
          .join(' '),
      [theme, showCode, error, className]
    );

    return (
      <ErrorBoundary onError={onError}>
        <div className={containerClassName} style={style}>
          {/* Preview Section */}
          {renderPreview && (
            <div className="rcv-code-view__preview">
              <Preview error={error} emptyContent={emptyPreviewContent}>
                {element}
              </Preview>
            </div>
          )}

          {/* Toolbar */}
          <div className="rcv-code-view__toolbar">
            <button
              type="button"
              className="rcv-code-view__toggle-btn"
              onClick={toggleCode}
              aria-expanded={showCode}
              aria-label={showCode ? 'Hide code' : 'Show code'}
            >
              <CodeIcon />
              <span>{showCode ? 'Hide Code' : 'Show Code'}</span>
            </button>

            {showCopyButton && (
              <CopyCodeButton code={code} aria-label="Copy code to clipboard" />
            )}
          </div>

          {/* Code Section */}
          {showCode && (
            <div className="rcv-code-view__code">
              {editable ? (
                <CodeEditor
                  code={code}
                  onChange={handleCodeChange}
                  language={language}
                />
              ) : (
                <Renderer
                  code={code}
                  language={language}
                  theme={theme as 'github-light' | 'github-dark'}
                />
              )}
            </div>
          )}
        </div>
      </ErrorBoundary>
    );
  }
);

CodeView.displayName = 'CodeView';

// Default export
export default CodeView;
