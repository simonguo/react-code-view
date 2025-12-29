/**
 * Core markdown transformation utilities
 */

import { parse } from 'marked';
import { createRenderer } from './renderer';
import type { TransformOptions, TransformResult } from './types';

/**
 * Escape characters for template literal
 */
function escapeTemplateLiteral(str: string): string {
  return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
}

/**
 * Transform markdown content to an ES module (sync version)
 *
 * @param source - Markdown source content
 * @param options - Transform options
 * @returns Transformed code as ES module
 */
export function transformMarkdownSync(
  source: string,
  options: TransformOptions = {}
): TransformResult {
  const { markedOptions = {}, codeBlockClassName, theme } = options;

  // Create renderer with syntax highlighting
  const renderer = createRenderer({ codeBlockClassName, theme });

  // Parse markdown to HTML
  const html = parse(source, {
    renderer,
    ...markedOptions
  });

  // Escape for template literal
  const escapedHtml = typeof html === 'string' ? escapeTemplateLiteral(html) : '';
  const rawHtml = typeof html === 'string' ? html : '';

  // Generate ES module code
  const code = `export default \`${escapedHtml}\`;`;

  return { code, html: rawHtml, map: null };
}

/**
 * Transform markdown content to an ES module (async version)
 *
 * @param source - Markdown source content
 * @param options - Transform options
 * @returns Promise resolving to transformed code
 */
export async function transformMarkdown(
  source: string,
  options: TransformOptions = {}
): Promise<TransformResult> {
  return transformMarkdownSync(source, options);
}
