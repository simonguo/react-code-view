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

  const liveExample = `import React from 'react';
import { CodeView } from '@react-code-view/react';
import '@react-code-view/react/styles/index.css';

const snippet = \`const App = () => {
  const [count, setCount] = React.useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Clicked {count} times
    </button>
  );
};

render(<App />);\`;

export default function Demo() {
  return (
    <CodeView
      language="tsx"
      theme="rcv-theme-default"
      renderPreview
      showCopyButton
      dependencies={{ React }}
    >
      {snippet}
    </CodeView>
  );
}
`;

  return (
    <div className="page-content">
      <Section id="quick-start" title="Quick Start">
        <p className="section-intro">Get up and running with React Code View in a few steps.</p>

        <h3>Step 1: Install</h3>
        <CodeBlock language="bash" theme={codeTheme} code="npm install @react-code-view/react" />

        <h3>Step 2: Import Styles</h3>
        <CodeBlock
          title="main.tsx"
          language="tsx"
          theme={codeTheme}
          code={`import '@react-code-view/react/styles/index.css';`}
        />

        <h3>Step 3: Use CodeView (edit + preview)</h3>
        <p>Create an online editable block that renders React components live:</p>
        <CodeBlock title="App.tsx" language="tsx" theme={codeTheme} code={liveExample} />

        <h3>Step 4: Toggle code / copy</h3>
        <p>Use the built-in toolbar in CodeView to show/hide source and copy the snippet.</p>

        <h3>Step 5: Add more examples</h3>
        <div className="next-steps-grid">
          <Link to="/examples/counter" className="next-step-card">
            <h4>🎮 Live Examples</h4>
            <p>Interactive counter and todo list</p>
          </Link>
          <Link to="/build-tools/vite" className="next-step-card">
            <h4>🔧 Build Tools</h4>
            <p>Wire CodeView into your bundler</p>
          </Link>
          <Link to="/components/code-view" className="next-step-card">
            <h4>🧩 Components</h4>
            <p>See props for CodeView & friends</p>
          </Link>
        </div>

        <h3>Need bundler setup?</h3>
        <p>
          We provide ready-to-copy configs for Vite, Webpack, Rollup, Esbuild, and Rspack in the
          <Link to="/build-tools/vite"> Build Tools</Link> section.
        </p>
      </Section>
    </div>
  );
};
