import { describe, it, expect } from 'vitest';
import { transformMarkdown, transformMarkdownSync } from '../transform';

describe('transformMarkdown', () => {
  it('should transform simple markdown to ES module', () => {
    const source = '# Hello World';
    const result = transformMarkdownSync(source);

    expect(result.code).toContain('export default');
    expect(result.html).toContain('<h1');
    expect(result.html).toContain('Hello World');
  });

  it('should transform markdown with code blocks', () => {
    const source = '```javascript\nconst a = 1;\n```';
    const result = transformMarkdownSync(source);

    expect(result.html).toContain('const a = 1');
  });

  it('should transform markdown with multiple paragraphs', () => {
    const source = `# Title

This is a paragraph.

This is another paragraph.`;

    const result = transformMarkdownSync(source);

    expect(result.html).toContain('<h1');
    expect(result.html).toContain('<p>');
    expect(result.html).toContain('This is a paragraph');
  });

  it('should handle empty markdown', () => {
    const source = '';
    const result = transformMarkdownSync(source);

    expect(result.code).toBe('export default ``;');
    expect(result.html).toBe('');
  });

  it('should escape template literal characters', () => {
    const source = 'Text with `code`, $var and \\ slash';
    const result = transformMarkdownSync(source);

    // Check that special template literal chars are escaped in code
    expect(result.code).toContain('export default');
    // $ should be escaped as \$
    expect(result.code).toContain('\$');
    // \ should be escaped as \\
    expect(result.code).toContain('\\\\');
  });

  it('should apply custom codeBlockClassName', () => {
    const source = '```js\nconst a = 1;\n```';
    const result = transformMarkdownSync(source, {
      codeBlockClassName: 'custom-code-block'
    });

    expect(result.html).toContain('custom-code-block');
  });

  it('async version should work the same as sync', async () => {
    const source = '# Async Test';
    const syncResult = transformMarkdownSync(source);
    const asyncResult = await transformMarkdown(source);

    expect(asyncResult.code).toBe(syncResult.code);
    expect(asyncResult.html).toBe(syncResult.html);
  });
});
