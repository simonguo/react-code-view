# @react-code-view/core

Core markdown transformation utilities for react-code-view. This package is framework-agnostic and can be used in any JavaScript environment.

## Installation

```bash
npm install @react-code-view/core
```

## Usage

### Basic Transformation

```js
import { transformMarkdown } from '@react-code-view/core';

const markdown = `
# Hello World

\`\`\`javascript
const greeting = 'Hello!';
console.log(greeting);
\`\`\`
`;

const result = await transformMarkdown(markdown);
console.log(result.code); // ES module string
```

### Custom Languages

```js
import { transformMarkdown } from '@react-code-view/core';

const result = await transformMarkdown(markdown, {
  languages: ['typescript', 'rust', 'python']
});
```

### Direct Highlighting

```js
import { highlight, initHighlighter } from '@react-code-view/core';

// Initialize highlighter (optional, will auto-initialize on first use)
await initHighlighter();

const highlighted = await highlight('print("Hello")', { language: 'python' });
```

## API

### `transformMarkdown(source, options?)`

Transform markdown to an ES module string.

**Options:**
- `languages` - Languages to register for highlighting
- `markedOptions` - Options passed to marked
- `codeBlockClassName` - Custom class for code blocks

### `highlight(code, options?)`

Highlight code with syntax highlighting using Shiki.

**Options:**
- `language` - Programming language (e.g., 'javascript', 'python')
- `theme` - Shiki theme (default: 'github-light')

### `initHighlighter()`

Initialize the Shiki highlighter. Called automatically on first use.

## License

MIT
