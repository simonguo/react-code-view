# @react-code-view/react

React components for rendering code with live preview and syntax highlighting.

## Installation

```bash
pnpm add @react-code-view/react @react-code-view/core
# or
npm install @react-code-view/react @react-code-view/core
```

## Quick Start

```tsx
import { CodeView } from '@react-code-view/react';
import '@react-code-view/react/styles/index.css';

// Optional: import highlight theme
import 'highlight.js/styles/atom-one-dark.css';

function App() {
  const code = `
<Button color="primary">
  Click me
</Button>
  `.trim();

  return (
    <CodeView 
      dependencies={{ Button }}
      language="jsx"
    >
      {code}
    </CodeView>
  );
}
```

## Components

### CodeView

The main component for displaying and executing React code.

```tsx
import { CodeView } from '@react-code-view/react';

<CodeView
  dependencies={{ Button, Icon }}  // Components available in code
  language="jsx"                    // Syntax highlighting language
  editable={true}                   // Enable code editing
  renderPreview={true}              // Show live preview
  showLineNumbers={true}            // Show line numbers
  showCopyButton={true}             // Show copy button
  theme="rcv-theme-dark"            // Theme class
  beforeCompile={(code) => code}    // Transform before compile
  afterCompile={(code) => code}     // Transform after compile
  onChange={(code) => {}}           // Code change callback
  onError={(error) => {}}           // Error callback
>
  {sourceCode}
</CodeView>
```

### Renderer

Syntax-highlighted code renderer.

```tsx
import { Renderer } from '@react-code-view/react';

<Renderer
  code={sourceCode}
  language="typescript"
  showLineNumbers={true}
/>
```

### MarkdownRenderer

Render markdown with syntax highlighting.

```tsx
import { MarkdownRenderer } from '@react-code-view/react';

<MarkdownRenderer>
  {markdownContent}
</MarkdownRenderer>
```

### CodeEditor

Editable code component with optional CodeMirror support.

```tsx
import { CodeEditor } from '@react-code-view/react';

<CodeEditor
  code={sourceCode}
  onChange={(newCode) => setCode(newCode)}
  language="javascript"
  readOnly={false}
/>
```

### Preview

Component for displaying executed code output.

```tsx
import { Preview } from '@react-code-view/react';

<Preview error={error}>
  {renderedElement}
</Preview>
```

### CopyCodeButton

Button to copy code to clipboard.

```tsx
import { CopyCodeButton } from '@react-code-view/react';

<CopyCodeButton code={sourceCode} />
```

### ErrorBoundary

Catch and display errors in child components.

```tsx
import { ErrorBoundary } from '@react-code-view/react';

<ErrorBoundary onError={(error) => console.error(error)}>
  {children}
</ErrorBoundary>
```

## Hooks

### useCodeExecution

Hook for executing code and capturing rendered output.

```tsx
import { useCodeExecution } from '@react-code-view/react';

function CustomCodeView({ initialCode, dependencies }) {
  const { element, error, code, setCode, execute } = useCodeExecution(
    initialCode,
    {
      dependencies,
      onError: (err) => console.error(err)
    }
  );

  return (
    <div>
      {error ? <pre>{error.message}</pre> : element}
      <textarea value={code} onChange={(e) => setCode(e.target.value)} />
    </div>
  );
}
```

## Utilities

```tsx
import { 
  canUseDOM,    // Check if DOM is available
  evalCode,     // Execute code string
  parseHTML,    // Parse HTML string
  parseDom,     // Parse DOM nodes
  mergeRefs     // Merge multiple refs
} from '@react-code-view/react';
```

## Icons

```tsx
import { CheckIcon, CodeIcon, CopyIcon } from '@react-code-view/react';
```

## Theming

The package includes CSS custom properties for theming:

```css
.rcv-code-view {
  --rcv-color-bg: #ffffff;
  --rcv-color-bg-code: #f6f8fa;
  --rcv-color-text: #24292f;
  --rcv-color-border: #d0d7de;
  --rcv-color-primary: #0969da;
  --rcv-color-error: #cf222e;
  /* ... more variables */
}

/* Dark theme */
.rcv-theme-dark {
  --rcv-color-bg: #0d1117;
  --rcv-color-bg-code: #161b22;
  /* ... */
}
```

## License

MIT
