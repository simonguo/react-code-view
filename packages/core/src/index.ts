/**
 * @react-code-view/core
 * Core markdown transformation utilities with Shiki syntax highlighting
 */

export { transformMarkdown, transformMarkdownSync } from './transform';
export { createRenderer } from './renderer';
export { highlight, highlightSync, initHighlighter } from './highlighter';
export type {
  TransformOptions,
  TransformResult,
  RendererOptions,
  HighlightOptions
} from './types';
