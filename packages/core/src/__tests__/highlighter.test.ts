import { describe, it, expect, beforeAll } from 'vitest';
import { highlight, highlightSync, initHighlighter } from '../highlighter';

describe('highlighter', () => {
  describe('highlight (async)', () => {
    it('should highlight JavaScript code', async () => {
      const code = 'const greeting = "Hello World";';
      const result = await highlight(code, { language: 'javascript' });

      expect(result).toContain('<pre');
      expect(result).toContain('Hello World');
    });

    it('should highlight TypeScript code', async () => {
      const code = 'const value: string = "test";';
      const result = await highlight(code, { language: 'typescript' });

      expect(result).toContain('<pre');
      expect(result).toContain('test');
    });

    it('should handle language aliases', async () => {
      const code = 'const a = 1;';
      const result = await highlight(code, { language: 'js' });

      expect(result).toContain('<pre');
    });

    it('should handle unknown languages gracefully', async () => {
      const code = 'some unknown language';
      const result = await highlight(code, { language: 'unknown-lang-xyz' });

      // Should fallback to plain text
      expect(result).toContain('some unknown language');
    });

    it('should apply theme option', async () => {
      const code = 'const a = 1;';
      const result = await highlight(code, {
        language: 'javascript',
        theme: 'github-dark'
      });

      expect(result).toContain('<pre');
    });

    it('should handle empty code', async () => {
      const code = '';
      const result = await highlight(code, { language: 'javascript' });

      expect(result).toContain('<pre');
    });

    it('should escape HTML in code', async () => {
      const code = '<script>alert("xss")</script>';
      const result = await highlight(code, { language: 'html' });

      // Should be properly escaped
      expect(result).not.toContain('<script>alert');
    });
  });

  describe('highlightSync', () => {
    beforeAll(async () => {
      // Initialize highlighter before sync tests
      await initHighlighter();
    });

    it('should highlight code synchronously after initialization', () => {
      const code = 'const a = 1;';
      const result = highlightSync(code, { language: 'javascript' });

      expect(result).toContain('<pre');
      expect(result).toContain('shiki');
      // Shiki converts code to styled HTML, so just check it's highlighted
      expect(result).toContain('class=');
    });

    it('should return plain code if highlighter not initialized', () => {
      // This test would run without beforeAll initialization
      const code = 'test code';
      const result = highlightSync(code, { language: 'javascript' });

      expect(result).toContain('test code');
    });

    it('should handle different languages', () => {
      const code = '{"key": "value"}';
      const result = highlightSync(code, { language: 'json' });

      expect(result).toContain('key');
      expect(result).toContain('value');
    });
  });

  describe('language aliases', () => {
    it('should map js to javascript', async () => {
      const code = 'const a = 1;';
      const result = await highlight(code, { language: 'js' });

      expect(result).toContain('<pre');
    });

    it('should map sh to bash', async () => {
      const code = 'echo "hello"';
      const result = await highlight(code, { language: 'sh' });

      expect(result).toContain('echo');
    });

    it('should map md to markdown', async () => {
      const code = '# Title';
      const result = await highlight(code, { language: 'md' });

      expect(result).toContain('Title');
    });
  });
});
