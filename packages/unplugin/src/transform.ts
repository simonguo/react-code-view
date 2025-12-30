import { transformMarkdownSync, createRenderer } from '@react-code-view/core';
import type { PluginOptions, TransformResult } from './types';
import { normalizeOptions } from './utils';

/**
 * Transform markdown content to a React component module
 */
export function transformMarkdown(
  code: string,
  _id: string,
  userOptions: PluginOptions = {}
): TransformResult {
  const options = normalizeOptions(userOptions);

  // If using native parser, generate CodeView-based component
  if (options.useNativeParser) {
    return {
      code: generateNativeParserComponent(code, options),
      map: null
    };
  }

  // Create renderer with options
  const renderer = createRenderer(options.rendererOptions);

  // Transform markdown to HTML
  const transformOptions = {
    ...(options.transformOptions as any),
    renderer
  } as any;

  const result = transformMarkdownSync(code, transformOptions);
  const codeBlocks = (result as any).codeBlocks ?? [];

  // Generate the output module
  if (options.wrapComponent) {
    return {
      code: generateReactComponent(result.html, codeBlocks, options),
      map: null
    };
  }

  return {
    code: generateDataExport(result.html, codeBlocks),
    map: null
  };
}

/**
 * Generate a React component module from transformed markdown
 */
function generateReactComponent(
  html: string,
  codeBlocks: Array<{ code: string; language: string }>,
  options: Required<PluginOptions>
): string {
  const componentName = options.componentName;
  const escapedHtml = JSON.stringify(html);

  return `
import React from 'react';

const html = ${escapedHtml};

export const codeBlocks = ${JSON.stringify(codeBlocks)};

export function ${componentName}({ className = '', ...props }) {
  return React.createElement('div', {
    className: \`rcv-markdown \${className}\`,
    dangerouslySetInnerHTML: { __html: html },
    ...props
  });
}

export const content = html;

export default ${componentName};
`.trim();
}

/**
 * Generate a data export module (without React component)
 */
function generateDataExport(
  html: string,
  codeBlocks: Array<{ code: string; language: string }>
): string {
  return `
export const html = ${JSON.stringify(html)};
export const codeBlocks = ${JSON.stringify(codeBlocks)};
export default html;
`.trim();
}

/**
 * Generate a CodeView-based component that uses native parseHTML
 */
function generateNativeParserComponent(
  markdown: string,
  options: Required<PluginOptions>
): string {
  const componentName = options.componentName;
  const escapedMarkdown = JSON.stringify(markdown);

  return `
import React from 'react';
import { CodeView } from '@react-code-view/react';

const markdownContent = ${escapedMarkdown};

export function ${componentName}({ dependencies, theme, ...props }) {
  return React.createElement(CodeView, {
    dependencies: dependencies || { useState: React.useState },
    theme: theme,
    ...props
  }, markdownContent);
}

export const content = markdownContent;

export default ${componentName};
`.trim();
}
