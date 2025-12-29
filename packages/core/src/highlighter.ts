/**
 * Shiki-based syntax highlighter
 */

import { getHighlighter, bundledLanguages, type Highlighter } from 'shiki';
import type { HighlightOptions } from './types';

let highlighterInstance: Highlighter | null = null;
let highlighterPromise: Promise<Highlighter> | null = null;

/**
 * Language alias mapping to Shiki language IDs
 */
const LANGUAGE_ALIASES: Record<string, string> = {
  js: 'javascript',
  jsx: 'jsx',
  ts: 'typescript',
  tsx: 'tsx',
  html: 'html',
  css: 'css',
  json: 'json',
  md: 'markdown',
  markdown: 'markdown',
  bash: 'bash',
  sh: 'bash',
  shell: 'bash',
  xml: 'xml'
};

/**
 * Get or create the Shiki highlighter instance
 */
async function ensureHighlighter(): Promise<Highlighter> {
  if (highlighterInstance) {
    return highlighterInstance;
  }

  if (!highlighterPromise) {
    highlighterPromise = getHighlighter({
      themes: ['github-light', 'github-dark'],
      langs: Object.keys(bundledLanguages)
    });
  }

  highlighterInstance = await highlighterPromise;
  return highlighterInstance;
}

/**
 * Highlight code with Shiki (async)
 */
export async function highlight(code: string, options: HighlightOptions = {}): Promise<string> {
  const { language = 'plaintext', theme = 'github-light' } = options;

  try {
    const highlighter = await ensureHighlighter();
    const lang = LANGUAGE_ALIASES[language.toLowerCase()] || language;

    const html = highlighter.codeToHtml(code, {
      lang: lang as any,
      theme: theme as any
    });

    return html;
  } catch (error) {
    console.warn(`[react-code-view/core] Failed to highlight code:`, error);
    return `<pre><code>${escapeHtml(code)}</code></pre>`;
  }
}

/**
 * Highlight code synchronously (for SSR/build time)
 * WARNING: This requires the highlighter to be pre-initialized with initHighlighter()
 */
export function highlightSync(code: string, options: HighlightOptions = {}): string {
  const { language = 'plaintext', theme = 'github-light' } = options;

  // If highlighter is not initialized, return plain code
  if (!highlighterInstance) {
    return `<pre class="shiki"><code class="language-${language}">${escapeHtml(code)}</code></pre>`;
  }

  try {
    const lang = LANGUAGE_ALIASES[language.toLowerCase()] || language;
    
    const html = highlighterInstance.codeToHtml(code, {
      lang: lang as any,
      theme: theme as any
    });
    
    return html;
  } catch (error) {
    console.warn(`[react-code-view/core] Failed to highlight code synchronously:`, error);
    return `<pre class="shiki"><code class="language-${language}">${escapeHtml(code)}</code></pre>`;
  }
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Pre-initialize highlighter for faster subsequent calls
 */
export async function initHighlighter(): Promise<void> {
  await ensureHighlighter();
}

