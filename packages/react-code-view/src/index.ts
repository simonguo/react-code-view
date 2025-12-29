/**
 * react-code-view
 *
 * A React component for rendering code with live preview and syntax highlighting.
 * This is the main package that re-exports everything from the core and react packages.
 */

// Re-export everything from @react-code-view/react
export {
  // Components
  CodeView,
  CodeEditor,
  Preview,
  Renderer,
  MarkdownRenderer,
  CopyCodeButton,
  ErrorBoundary,
  // Hooks
  useCodeExecution,
  // Icons
  CheckIcon,
  CodeIcon,
  CopyIcon,
  // Utilities
  canUseDOM,
  evalCode,
  mergeRefs,
  parseHTML,
  parseDom,
  // Default export
  default
} from '@react-code-view/react';

// Re-export types from @react-code-view/react
export type {
  CodeViewProps,
  CodeEditorProps,
  PreviewProps,
  RendererProps,
  MarkdownRendererProps,
  CopyCodeButtonProps,
  ErrorBoundaryProps,
  ErrorBoundaryState,
  UseCodeExecutionOptions
} from '@react-code-view/react';

// Re-export from @react-code-view/core
export {
  // Transform functions
  transformMarkdown,
  transformMarkdownSync,
  // Syntax highlighting
  highlight,
  highlightSync,
  initHighlighter,
  // Renderer
  createRenderer
} from '@react-code-view/core';

// Re-export types from @react-code-view/core
export type {
  TransformOptions,
  TransformResult,
  RendererOptions,
  HighlightOptions
} from '@react-code-view/core';
