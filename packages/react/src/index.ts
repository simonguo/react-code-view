/**
 * @react-code-view/react
 * React components for rendering code with live preview
 */

// Components
export {
  CodeView,
  CodeEditor,
  Preview,
  Renderer,
  MarkdownRenderer,
  CopyCodeButton,
  ErrorBoundary,
  default
} from './components';

export type {
  CodeViewProps,
  CodeEditorProps,
  PreviewProps,
  RendererProps,
  MarkdownRendererProps,
  CopyCodeButtonProps,
  ErrorBoundaryProps,
  ErrorBoundaryState
} from './components';

// Hooks
export { useCodeExecution } from './hooks';
export type { UseCodeExecutionOptions } from './hooks/useCodeExecution';

// Icons
export { CheckIcon, CodeIcon, CopyIcon } from './icons';

// Utilities
export { canUseDOM, evalCode, mergeRefs, parseHTML, parseDom } from './utils';
