import type { TransformOptions, RendererOptions } from '@react-code-view/core';

export interface PluginOptions {
  /**
   * File extensions to process
   * @default ['.md', '.mdx']
   */
  include?: string[];

  /**
   * File patterns to exclude
   * @default [/node_modules/]
   */
  exclude?: (string | RegExp)[];

  /**
   * Transform options for markdown processing
   */
  transformOptions?: Partial<TransformOptions>;

  /**
   * Renderer options for code highlighting
   */
  rendererOptions?: Partial<RendererOptions>;

  /**
   * Custom filter function to determine if a file should be processed
   */
  filter?: (id: string) => boolean;

  /**
   * Generate React component wrapper
   * @default true
   */
  wrapComponent?: boolean;

  /**
   * Component name prefix for generated exports
   * @default 'MarkdownContent'
   */
  componentName?: string;

  /**
   * Use native parseHTML rendering instead of transforming markdown to HTML
   * When true, generates a CodeView component that uses parseHTML at runtime
   * @default true
   */
  useNativeParser?: boolean;
}

export const DEFAULT_OPTIONS: Required<PluginOptions> = {
  include: ['.md', '.mdx'],
  exclude: [/node_modules/],
  transformOptions: {},
  rendererOptions: {},
  filter: () => true,
  wrapComponent: true,
  componentName: 'MarkdownContent',
  useNativeParser: true
};

export interface TransformContext {
  id: string;
  code: string;
}

export interface TransformResult {
  code: string;
  map?: string | null;
}
