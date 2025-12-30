import React from 'react';
import { Section } from '../components/Section';
import { CodeBlock } from '../components/CodeBlock';
import { Link } from 'react-router-dom';

interface QuickStartPageProps {
  theme: string;
}

export const QuickStartPage: React.FC<QuickStartPageProps> = ({ theme }) => {
  const isDark = theme === 'rcv-theme-dark';
  const codeTheme = isDark ? 'github-dark' : 'github-light';

  const viteConfig = `// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactCodeView from '@react-code-view/unplugin/vite';

export default defineConfig({
  plugins: [
    react(),
    reactCodeView() // Enable markdown import
  ]
});`;

  const markdownExample = `# Interactive Counter

Here's a live counter component:

<!--start-code-->
\`\`\`jsx
function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
render(<Counter />);
\`\`\`
<!--end-code-->

The code above is fully interactive!`;

  const importExample = `import Demo from './demo.md';

function App() {
  return <Demo />;
}

// Or pass props:
<Demo theme="rcv-theme-dark" />`;

  const basicExample = `import { CodeView } from '@react-code-view/react';
import '@react-code-view/react/styles/index.css';

const code = \`
function App() {
  const [count, setCount] = React.useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
render(<App />);
\`;

<CodeView
  language="jsx"
  renderPreview
  dependencies={{ React }}
>
  {code}
</CodeView>`;

  return (
    <div className="page-content">
      <Section id="quick-start" title="Quick Start">
        <p className="section-intro">
          Get started in 3 simple steps - the most convenient way to create interactive documentation!
        </p>

        <div style={{
          padding: '16px',
          background: isDark ? '#1c2128' : '#f0f6fc',
          borderRadius: '8px',
          border: isDark ? '1px solid #30363d' : '1px solid #0969da',
          marginBottom: '32px'
        }}>
          <p style={{ margin: 0, fontWeight: 'bold', color: isDark ? '#58a6ff' : '#0969da' }}>
            ⭐ Recommended: Import markdown files as React components
          </p>
        </div>

        <h3>Step 1: Install</h3>
        <CodeBlock language="bash" theme={codeTheme} code="npm install @react-code-view/react @react-code-view/unplugin" />

        <h3>Step 2: Configure Build Tool</h3>
        <p>Add the unplugin to your build configuration (Vite example):</p>
        <CodeBlock title="vite.config.js" language="javascript" theme={codeTheme} code={viteConfig} />
        <p style={{ marginTop: '8px', fontSize: '14px', color: isDark ? '#8b949e' : '#6b7280' }}>
          Also works with Webpack, Rollup, esbuild, and Rspack - see <Link to="/build-tools/vite">Build Tools</Link> for other configs.
        </p>

        <h3>Step 3: Create Markdown with Code Blocks</h3>
        <p>Create a markdown file with interactive code blocks:</p>
        <CodeBlock title="demo.md" language="markdown" theme={codeTheme} code={markdownExample} />

        <h3>Step 4: Import and Use!</h3>
        <p>Import the markdown file like any React component:</p>
        <CodeBlock title="App.tsx" language="tsx" theme={codeTheme} code={importExample} />

        <div style={{
          padding: '20px',
          background: isDark ? '#1c2128' : '#f6f8fa',
          borderRadius: '8px',
          border: isDark ? '1px solid #30363d' : '1px solid #d0d7de',
          marginTop: '24px',
          marginBottom: '32px'
        }}>
          <p style={{ margin: 0, fontWeight: 'bold', marginBottom: '12px' }}>
            🎉 That&apos;s it! Your markdown is now a React component with:
          </p>
          <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
            <li>Live, interactive code blocks</li>
            <li>Automatic syntax highlighting</li>
            <li>Type-safe imports</li>
            <li>Full TypeScript support</li>
          </ul>
        </div>

        <h3>Alternative: Basic CodeView Usage</h3>
        <p>For simple code snippets without markdown files:</p>
        <CodeBlock title="App.tsx" language="tsx" theme={codeTheme} code={basicExample} />

        <h3>Next Steps</h3>
        <div className="next-steps-grid">
          <Link to="/examples/markdown" className="next-step-card">
            <h4>📝 Markdown Example</h4>
            <p>See a complete markdown demo</p>
          </Link>
          <Link to="/examples/counter" className="next-step-card">
            <h4>🎮 More Examples</h4>
            <p>Counter, todo list, and more</p>
          </Link>
          <Link to="/build-tools/vite" className="next-step-card">
            <h4>🔧 Build Tools</h4>
            <p>Webpack, Rollup, esbuild configs</p>
          </Link>
          <Link to="/components/code-view" className="next-step-card">
            <h4>🧩 API Reference</h4>
            <p>All props and components</p>
          </Link>
        </div>
      </Section>
    </div>
  );
};
