interface ParsedFragment {
  key: number;
  type: 'code' | 'html';
  content: string;
}

/**
 * Parse HTML source to extract code and HTML fragments
 */
export function parseHTML(source: string): ParsedFragment[] | null {
  if (!source) {
    return null;
  }

  // Check if source contains code markers
  if (!source.match(/<!-+\s?start-code\s?-+>[\s\S]+?<!-+\s?end-code\s?-+>/gi)) {
    return null;
  }

  const fragments = source.split(/(<!-+\s?start-code\s?-+>[\s\S]+?<!-+\s?end-code\s?-+>)/gi);

  return fragments
    .filter(fragment => fragment.trim())
    .map((fragment, key) => {
      if (fragment.match(/<!-+\s?start-code\s?-+>[\s\S]+?<!-+\s?end-code\s?-+>/gi)) {
        // Extract content between start-code and end-code comments
        let content = fragment
          .replace(/<!-+\s?start-code\s?-+>/gi, '')
          .replace(/<!-+\s?end-code\s?-+>/gi, '')
          .trim();
        
        // Strip markdown code fence markers
        // Remove opening fence: ``` followed by optional language, then newline
        if (content.startsWith('```')) {
          const firstNewline = content.indexOf('\n');
          if (firstNewline !== -1) {
            content = content.substring(firstNewline + 1);
          }
        }
        
        // Remove closing fence: find last occurrence of newline + ```
        const closingFenceIndex = content.lastIndexOf('\n```');
        if (closingFenceIndex !== -1) {
          content = content.substring(0, closingFenceIndex);
        }
        
        return { key, type: 'code' as const, content: content.trim() };
      }

      return { key, type: 'html' as const, content: fragment };
    });
}
