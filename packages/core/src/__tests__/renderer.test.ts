import { describe, it, expect, beforeAll } from 'vitest';
import { createRenderer } from '../renderer';
import { initHighlighter } from '../highlighter';

describe('createRenderer', () => {
  beforeAll(async () => {
    // Initialize highlighter for renderer tests
    await initHighlighter();
  });

  it('should create a marked renderer', () => {
    const renderer = createRenderer();

    expect(renderer).toBeDefined();
    expect(typeof renderer.code).toBe('function');
  });

  it('should render code blocks with default className', () => {
    const renderer = createRenderer();
    const code = 'const a = 1;';
    const result = renderer.code(code, 'javascript', false);

    expect(result).toContain('rcv-code-block');
    expect(result).toContain('shiki');
  });

  it('should render code blocks with custom className', () => {
    const renderer = createRenderer({
      codeBlockClassName: 'custom-block'
    });
    const code = 'const a = 1;';
    const result = renderer.code(code, 'javascript', false);

    expect(result).toContain('custom-block');
    expect(result).not.toContain('rcv-code-block');
  });

  it('should handle code without language', () => {
    const renderer = createRenderer();
    const code = 'plain text';
    const result = renderer.code(code, undefined, false);

    expect(result).toContain('plain text');
  });

  it('should handle different languages', () => {
    const renderer = createRenderer();
    const jsCode = 'const a = 1;';
    const htmlCode = '<div>Hello</div>';

    const jsResult = renderer.code(jsCode, 'javascript', false);
    const htmlResult = renderer.code(htmlCode, 'html', false);

    expect(jsResult).toContain('shiki');
    // HTML is properly rendered by Shiki
    expect(htmlResult).toContain('shiki');
  });

  it('should apply theme option', () => {
    const renderer = createRenderer({ theme: 'github-dark' });
    const code = 'const a = 1;';
    const result = renderer.code(code, 'javascript', false);

    expect(result).toContain('<pre');
  });
});
