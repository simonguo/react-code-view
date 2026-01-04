import { describe, it, expect, vi } from 'vitest';
import { unpluginReactCodeView } from '../core';

describe('unpluginReactCodeView', () => {
  describe('plugin creation', () => {
    it('should create plugin with default options', () => {
      const factory = unpluginReactCodeView.raw;
      const plugin = factory({}, {} as any);
      
      expect(plugin.name).toBe('unplugin-react-code-view');
      expect(plugin.transformInclude).toBeDefined();
      expect(plugin.transform).toBeDefined();
    });

    it('should create plugin with custom options', () => {
      const factory = unpluginReactCodeView.raw;
      const plugin = factory({
        componentName: 'CustomComponent',
        include: ['.txt']
      }, {} as any);
      
      expect(plugin.name).toBe('unplugin-react-code-view');
    });

    it('should create plugin without options', () => {
      const factory = unpluginReactCodeView.raw;
      const plugin = factory(undefined, {} as any);
      
      expect(plugin.name).toBe('unplugin-react-code-view');
    });
  });

  describe('transformInclude', () => {
    it('should include .md files by default', () => {
      const factory = unpluginReactCodeView.raw;
      const plugin = factory({}, {} as any);
      
      expect(plugin.transformInclude?.('/path/to/file.md')).toBe(true);
      expect(plugin.transformInclude?.('/path/to/file.markdown')).toBe(true);
    });

    it('should exclude non-markdown files', () => {
      const factory = unpluginReactCodeView.raw;
      const plugin = factory({}, {} as any);
      
      expect(plugin.transformInclude?.('/path/to/file.ts')).toBe(false);
      expect(plugin.transformInclude?.('/path/to/file.js')).toBe(false);
    });

    it('should respect custom include extensions', () => {
      const factory = unpluginReactCodeView.raw;
      const plugin = factory({
        include: ['.txt', '.doc']
      }, {} as any);
      
      expect(plugin.transformInclude?.('/path/to/file.txt')).toBe(true);
      expect(plugin.transformInclude?.('/path/to/file.md')).toBe(false);
    });

    it('should respect exclude patterns', () => {
      const factory = unpluginReactCodeView.raw;
      const plugin = factory({
        exclude: ['node_modules']
      }, {} as any);
      
      expect(plugin.transformInclude?.('/node_modules/file.md')).toBe(false);
      expect(plugin.transformInclude?.('/src/file.md')).toBe(true);
    });
  });

  describe('transform', () => {
    it('should transform markdown files', () => {
      const factory = unpluginReactCodeView.raw;
      const plugin = factory({}, {} as any);
      const code = '# Hello World';
      const id = '/path/to/file.md';
      
      const result = plugin.transform?.call({} as any, code, id);
      
      expect(result).toBeDefined();
      expect(result).toHaveProperty('code');
    });

    it('should return null for non-markdown files', () => {
      const factory = unpluginReactCodeView.raw;
      const plugin = factory({}, {} as any);
      const code = 'const x = 1;';
      const id = '/path/to/file.ts';
      
      const result = plugin.transform?.call({} as any, code, id);
      
      expect(result).toBe(null);
    });

    it('should handle transform errors gracefully', () => {
      const factory = unpluginReactCodeView.raw;
      const plugin = factory({
        transformOptions: {
          // Invalid options that might cause errors
        } as any
      }, {} as any);
      
      const mockError = vi.fn();
      const context = { error: mockError };
      
      // This should not throw
      const code = '# Test';
      const id = '/path/to/file.md';
      plugin.transform?.call(context as any, code, id);
    });

    it('should use native parser when enabled', () => {
      const factory = unpluginReactCodeView.raw;
      const plugin = factory({
        useNativeParser: true
      }, {} as any);
      
      const code = '# Hello';
      const id = '/path/to/file.md';
      const result = plugin.transform?.call({} as any, code, id);
      
      expect(result?.code).toContain('CodeView');
      expect(result?.code).toContain('@react-code-view/react');
    });

    it('should generate React component by default', () => {
      const factory = unpluginReactCodeView.raw;
      const plugin = factory({
        wrapComponent: true
      }, {} as any);
      
      const code = '# Test Component';
      const id = '/path/to/file.md';
      const result = plugin.transform?.call({} as any, code, id);
      
      expect(result?.code).toContain('import React');
      expect(result?.code).toContain('export function MarkdownComponent');
    });
  });

  describe('vite integration', () => {
    it('should provide vite config', () => {
      const factory = unpluginReactCodeView.raw;
      const plugin = factory({}, {} as any);
      
      expect(plugin.vite).toBeDefined();
      expect(plugin.vite?.config).toBeDefined();
    });

    it('should add extensions to optimizeDeps', () => {
      const factory = unpluginReactCodeView.raw;
      const plugin = factory({
        include: ['.md', '.markdown']
      }, {} as any);
      
      const config = plugin.vite?.config?.();
      
      expect(config).toBeDefined();
      expect(config?.optimizeDeps?.extensions).toEqual(['.md', '.markdown']);
    });
  });

  describe('rollup integration', () => {
    it('should provide rollup config', () => {
      const factory = unpluginReactCodeView.raw;
      const plugin = factory({}, {} as any);
      
      expect(plugin.rollup).toBeDefined();
      expect(plugin.rollup?.resolveId).toBeDefined();
    });

    it('should return null for resolveId to let other plugins handle resolution', () => {
      const factory = unpluginReactCodeView.raw;
      const plugin = factory({}, {} as any);
      
      const result = plugin.rollup?.resolveId?.();
      
      expect(result).toBe(null);
    });
  });

  describe('plugin exports', () => {
    it('should export webpack plugin', () => {
      expect(unpluginReactCodeView.webpack).toBeDefined();
    });

    it('should export vite plugin', () => {
      expect(unpluginReactCodeView.vite).toBeDefined();
    });

    it('should export rollup plugin', () => {
      expect(unpluginReactCodeView.rollup).toBeDefined();
    });

    it('should export esbuild plugin', () => {
      expect(unpluginReactCodeView.esbuild).toBeDefined();
    });

    it('should export rspack plugin', () => {
      expect(unpluginReactCodeView.rspack).toBeDefined();
    });
  });
});
