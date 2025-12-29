import React, { useState, useEffect } from 'react';
import { transformMarkdownSync, initHighlighter } from '@react-code-view/core';
import type { RendererOptions, TransformOptions } from '@react-code-view/core';

export interface MarkdownRendererProps {
  /** Markdown content to render */
  children: string;

  /** Custom renderer options */
  rendererOptions?: Partial<RendererOptions>;

  /** Transform options */
  transformOptions?: Partial<TransformOptions>;

  /** Custom className */
  className?: string;

  /** Syntax highlighting theme */
  theme?: string;
}

/**
 * Component for rendering Markdown content with syntax highlighting
 */
export const MarkdownRenderer = React.memo<MarkdownRendererProps>(
  ({ children, rendererOptions = {}, transformOptions = {}, className = '', theme = 'github-light' }) => {
    const [html, setHtml] = useState<string>('');
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize Shiki highlighter once
    useEffect(() => {
      initHighlighter().then(() => {
        setIsInitialized(true);
      });
    }, []);

    // Render markdown when initialized or when content/theme changes
    useEffect(() => {
      if (!isInitialized || !children) {
        setHtml('');
        return;
      }

      const result = transformMarkdownSync(children, {
        ...transformOptions,
        ...rendererOptions,
        theme
      });

      setHtml(result.html);
    }, [children, rendererOptions, transformOptions, theme, isInitialized]);

    return (
      <div
        className={`rcv-markdown ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
);

MarkdownRenderer.displayName = 'MarkdownRenderer';
