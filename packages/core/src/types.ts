/**
 * Type definitions for @react-code-view/core
 */

/**
 * Options for syntax highlighting with Shiki
 */
export interface HighlightOptions {
  /**
   * Programming language for highlighting
   */
  language?: string;

  /**
   * Shiki theme to use
   * @default 'github-light'
   */
  theme?: string;
}

/**
 * Options for the markdown renderer
 */
export interface RendererOptions {
  /**
   * Custom class name for code blocks
   * @default 'rcv-code-block'
   */
  codeBlockClassName?: string;

  /**
   * Shiki theme to use for syntax highlighting
   * @default 'github-light'
   */
  theme?: string;
}

/**
 * Options for markdown transformation
 */
export interface TransformOptions extends RendererOptions {
  /**
   * Options passed to marked parser
   * @see https://marked.js.org/using_advanced#options
   */
  markedOptions?: Record<string, unknown>;
}

/**
 * Result of markdown transformation
 */
export interface TransformResult {
  /**
   * The transformed code (ES module format)
   */
  code: string;

  /**
   * The raw HTML output
   */
  html: string;

  /**
   * Source map (if available)
   */
  map?: string | null;
}
