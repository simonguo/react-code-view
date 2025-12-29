import { parseDom } from './parseDom';

interface ParsedFragment {
  key: number;
  type: 'code' | 'html';
  content: string;
}

function getText(element: Element): string {
  return element.textContent || '';
}

/**
 * Parse HTML source to extract code and HTML fragments
 */
export function parseHTML(source: string): ParsedFragment[] | null {
  if (!source) {
    return null;
  }

  const fragments = source.split(/(<!-+\s?start-code\s?-+>[\s\S]+?<!-+\s?end-code\s?-+>)/gi);

  return fragments
    .filter(fragment => fragment.trim())
    .map((fragment, key) => {
      if (fragment.match(/<!-+\s?start-code\s?-+>[\s\S]+?<!-+\s?end-code\s?-+>/gi)) {
        const dom = parseDom(fragment);
        return { key, type: 'code' as const, content: dom ? getText(dom) : fragment };
      }

      return { key, type: 'html' as const, content: fragment };
    });
}
