/**
 * Markdown renderer with syntax highlighting using Shiki
 */

import { Renderer } from 'marked';
import { highlightSync } from './highlighter';
import type { RendererOptions } from './types';

/**
 * Create a marked renderer with Shiki syntax highlighting
 */
export function createRenderer(options: RendererOptions = {}): Renderer {
  const { codeBlockClassName = 'rcv-code-block', theme = 'github-light' } = options;

  const renderer = new Renderer();

  // Override code block rendering with Shiki
  renderer.code = function (code: string, language?: string): string {
    const lang = language || 'plaintext';
    
    // Use Shiki for highlighting
    const highlighted = highlightSync(code, { language: lang, theme });

    // Wrap in our custom classes
    return `<div class="${codeBlockClassName}">${highlighted}</div>`;
  };

  return renderer;
}
