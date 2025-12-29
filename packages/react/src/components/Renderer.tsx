import React, { useEffect, useState } from 'react';
import { highlight } from '@react-code-view/core';
import type { HighlightOptions } from '@react-code-view/core';

export interface RendererProps {
  /** Code to render with syntax highlighting */
  code: string;

  /** Programming language */
  language?: string;

  /** Shiki theme */
  theme?: string;

  /** Highlight.js options (deprecated, use theme instead) */
  highlightOptions?: Partial<HighlightOptions>;

  /** Custom className */
  className?: string;
}

/**
 * Syntax-highlighted code renderer using Shiki
 */
export const Renderer = React.memo<RendererProps>(
  ({ code, language = 'plaintext', theme, highlightOptions = {}, className = '' }) => {
    const [highlightedHtml, setHighlightedHtml] = useState<string>('');

    useEffect(() => {
      let cancelled = false;

      const doHighlight = async () => {
        const html = await highlight(code, {
          language,
          theme: theme || (className.includes('dark') ? 'github-dark' : 'github-light'),
          ...highlightOptions
        });

        if (!cancelled) {
          setHighlightedHtml(html);
        }
      };

      doHighlight();

      return () => {
        cancelled = true;
      };
    }, [code, language, theme, className, highlightOptions]);

    if (!highlightedHtml) {
      return (
        <div className={`rcv-renderer ${className}`}>
          <pre className="rcv-renderer__pre">
            <code className={`language-${language}`}>{code}</code>
          </pre>
        </div>
      );
    }

    return (
      <div
        className={`rcv-renderer ${className}`}
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      />
    );
  }
);

Renderer.displayName = 'Renderer';
