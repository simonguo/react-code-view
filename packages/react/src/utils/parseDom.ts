import { canUseDOM } from './canUseDOM';

/**
 * Parse HTML string to DOM element
 */
export function parseDom(html: string): Element | null {
  if (!canUseDOM) {
    return null;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return doc.body.firstElementChild;
}
