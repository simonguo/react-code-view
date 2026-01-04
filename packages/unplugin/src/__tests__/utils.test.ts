import { describe, it, expect } from 'vitest';
import { normalizeOptions, shouldProcess, getExtension, toValidIdentifier } from '../utils';
import { DEFAULT_OPTIONS } from '../types';

describe('utils', () => {
  describe('normalizeOptions', () => {
    it('should return default options when no options provided', () => {
      const result = normalizeOptions();
      expect(result).toEqual(DEFAULT_OPTIONS);
    });

    it('should merge user options with defaults', () => {
      const userOptions = {
        componentName: 'CustomComponent',
        wrapComponent: false
      };
      const result = normalizeOptions(userOptions);
      
      expect(result.componentName).toBe('CustomComponent');
      expect(result.wrapComponent).toBe(false);
      expect(result.include).toEqual(DEFAULT_OPTIONS.include);
    });

    it('should deep merge transformOptions', () => {
      const userOptions = {
        transformOptions: {
          theme: 'github-dark'
        }
      };
      const result = normalizeOptions(userOptions);
      
      expect(result.transformOptions.theme).toBe('github-dark');
    });

    it('should deep merge rendererOptions', () => {
      const userOptions = {
        rendererOptions: {
          theme: 'github-dark'
        }
      };
      const result = normalizeOptions(userOptions);
      
      expect(result.rendererOptions.theme).toBe('github-dark');
    });
  });

  describe('shouldProcess', () => {
    it('should process .md files by default', () => {
      const options = normalizeOptions();
      expect(shouldProcess('/path/to/file.md', options)).toBe(true);
    });

    it('should process .markdown files by default', () => {
      const options = normalizeOptions();
      expect(shouldProcess('/path/to/file.markdown', options)).toBe(true);
    });

    it('should not process non-markdown files', () => {
      const options = normalizeOptions();
      expect(shouldProcess('/path/to/file.ts', options)).toBe(false);
      expect(shouldProcess('/path/to/file.js', options)).toBe(false);
    });

    it('should respect custom filter function', () => {
      const options = normalizeOptions({
        filter: id => id.includes('docs')
      });
      
      expect(shouldProcess('/docs/file.md', options)).toBe(true);
      expect(shouldProcess('/src/file.md', options)).toBe(false);
    });

    it('should exclude files matching exclude patterns (string)', () => {
      const options = normalizeOptions({
        exclude: ['node_modules', 'test']
      });
      
      expect(shouldProcess('/node_modules/file.md', options)).toBe(false);
      expect(shouldProcess('/test/file.md', options)).toBe(false);
      expect(shouldProcess('/src/file.md', options)).toBe(true);
    });

    it('should exclude files matching exclude patterns (RegExp)', () => {
      const options = normalizeOptions({
        exclude: [/node_modules/, /\.test\.md$/]
      });
      
      expect(shouldProcess('/node_modules/file.md', options)).toBe(false);
      expect(shouldProcess('/src/file.test.md', options)).toBe(false);
      expect(shouldProcess('/src/file.md', options)).toBe(true);
    });

    it('should check include extensions', () => {
      const options = normalizeOptions({
        include: ['.txt', '.doc']
      });
      
      expect(shouldProcess('/path/to/file.txt', options)).toBe(true);
      expect(shouldProcess('/path/to/file.doc', options)).toBe(true);
      expect(shouldProcess('/path/to/file.md', options)).toBe(false);
    });
  });

  describe('getExtension', () => {
    it('should extract file extension', () => {
      expect(getExtension('/path/to/file.md')).toBe('.md');
      expect(getExtension('/path/to/file.markdown')).toBe('.markdown');
      expect(getExtension('/path/to/file.test.ts')).toBe('.ts');
    });

    it('should return empty string for files without extension', () => {
      expect(getExtension('/path/to/file')).toBe('');
      expect(getExtension('README')).toBe('');
    });

    it('should handle paths with dots', () => {
      expect(getExtension('/path.to/file.md')).toBe('.md');
      expect(getExtension('file.name.with.dots.md')).toBe('.md');
    });
  });

  describe('toValidIdentifier', () => {
    it('should convert string to valid identifier', () => {
      expect(toValidIdentifier('my-component')).toBe('my_component');
      expect(toValidIdentifier('my.component')).toBe('my_component');
      expect(toValidIdentifier('my component')).toBe('my_component');
    });

    it('should handle special characters', () => {
      expect(toValidIdentifier('my@component#')).toBe('my_component_');
      expect(toValidIdentifier('component-v2.0')).toBe('component_v2_0');
    });

    it('should prefix numbers with underscore', () => {
      expect(toValidIdentifier('123component')).toBe('_123component');
      expect(toValidIdentifier('1')).toBe('_1');
    });

    it('should preserve valid identifiers', () => {
      expect(toValidIdentifier('MyComponent')).toBe('MyComponent');
      expect(toValidIdentifier('_privateVar')).toBe('_privateVar');
      expect(toValidIdentifier('$jquery')).toBe('$jquery');
    });
  });
});
