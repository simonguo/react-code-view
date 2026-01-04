import { describe, it, expect } from 'vitest';
import { transformMarkdown } from '../transform';

describe('transformMarkdown', () => {
  describe('native parser mode', () => {
    it('should generate CodeView-based component', () => {
      const markdown = '# Hello\n\nWorld';
      const result = transformMarkdown(markdown, 'test.md', {
        useNativeParser: true
      });

      expect(result.code).toContain('import React from \'react\'');
      expect(result.code).toContain('import { CodeView } from \'@react-code-view/react\'');
      expect(result.code).toContain('const markdownContent =');
      expect(result.code).toContain('export function MarkdownContent');
      expect(result.code).toContain('export default MarkdownContent');
      expect(result.map).toBe(null);
    });

    it('should use custom component name', () => {
      const markdown = '# Test';
      const result = transformMarkdown(markdown, 'test.md', {
        useNativeParser: true,
        componentName: 'CustomDoc'
      });

      expect(result.code).toContain('export function CustomDoc');
      expect(result.code).toContain('export default CustomDoc');
    });

    it('should escape markdown content properly', () => {
      const markdown = 'Line with "quotes" and \'apostrophes\'';
      const result = transformMarkdown(markdown, 'test.md', {
        useNativeParser: true
      });

      expect(result.code).toContain(JSON.stringify(markdown));
    });
  });

  describe('HTML transform mode', () => {
    it('should generate React component by default', () => {
      const markdown = '# Hello World';
      const result = transformMarkdown(markdown, 'test.md', {
        useNativeParser: false,
        wrapComponent: true
      });

      expect(result.code).toContain('import React from \'react\'');
      expect(result.code).toContain('export function MarkdownContent');
      expect(result.code).toContain('dangerouslySetInnerHTML');
      expect(result.code).toContain('export const codeBlocks');
      expect(result.code).toContain('export default MarkdownContent');
      expect(result.map).toBe(null);
    });

    it('should transform markdown to HTML', () => {
      const markdown = '# Heading\n\nParagraph text';
      const result = transformMarkdown(markdown, 'test.md', {
        useNativeParser: false,
        wrapComponent: true
      });

      expect(result.code).toContain('<h1');
      expect(result.code).toContain('Heading');
      expect(result.code).toContain('<p>');
      expect(result.code).toContain('Paragraph text');
    });

    it('should use custom component name', () => {
      const markdown = '# Test';
      const result = transformMarkdown(markdown, 'test.md', {
        useNativeParser: false,
        wrapComponent: true,
        componentName: 'MyDoc'
      });

      expect(result.code).toContain('export function MyDoc');
      expect(result.code).toContain('export default MyDoc');
    });

    it('should generate data export when wrapComponent is false', () => {
      const markdown = '# Data Only';
      const result = transformMarkdown(markdown, 'test.md', {
        useNativeParser: false,
        wrapComponent: false
      });

      expect(result.code).not.toContain('import React');
      expect(result.code).toContain('export const html =');
      expect(result.code).toContain('export const codeBlocks =');
      expect(result.code).toContain('export default html');
    });

    it('should handle code blocks', () => {
      const markdown = '```js\nconst x = 1;\n```';
      const result = transformMarkdown(markdown, 'test.md', {
        useNativeParser: false,
        wrapComponent: true
      });

      expect(result.code).toContain('codeBlocks');
      expect(result.code).toContain('<pre');
    });

    it('should apply custom renderer options', () => {
      const markdown = '# Test';
      const result = transformMarkdown(markdown, 'test.md', {
        useNativeParser: false,
        wrapComponent: true,
        rendererOptions: {
          theme: 'github-dark'
        }
      });

      expect(result.code).toBeDefined();
      expect(result.map).toBe(null);
    });
  });

  describe('edge cases', () => {
    it('should handle empty markdown', () => {
      const result = transformMarkdown('', 'test.md', {
        useNativeParser: false,
        wrapComponent: true
      });

      expect(result.code).toBeDefined();
      expect(result.code).toContain('export function MarkdownContent');
    });

    it('should handle markdown with special characters', () => {
      const markdown = '# Title with <tags> & "quotes"';
      const result = transformMarkdown(markdown, 'test.md', {
        useNativeParser: false,
        wrapComponent: true
      });

      expect(result.code).toBeDefined();
    });

    it('should handle multiline code blocks', () => {
      const markdown = '```javascript\nfunction test() {\n  return true;\n}\n```';
      const result = transformMarkdown(markdown, 'test.md', {
        useNativeParser: false,
        wrapComponent: true
      });

      expect(result.code).toContain('codeBlocks');
    });

    it('should handle markdown with links', () => {
      const markdown = '[Link text](https://example.com)';
      const result = transformMarkdown(markdown, 'test.md', {
        useNativeParser: false,
        wrapComponent: true
      });

      expect(result.code).toContain('<a');
      expect(result.code).toContain('href');
    });
  });
});
