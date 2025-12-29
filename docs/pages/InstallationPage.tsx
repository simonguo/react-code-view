import React from 'react';
import { Section } from '../components/Section';
import { CodeBlock } from '../components/CodeBlock';

interface InstallationPageProps {
  theme: string;
}

export const InstallationPage: React.FC<InstallationPageProps> = ({ theme }) => {
  const isDark = theme === 'rcv-theme-dark';
  const codeTheme = isDark ? 'github-dark' : 'github-light';

  return (
    <div className="page-content">
      <Section id="installation" title="Installation">
        <p className="section-intro">
          Choose your preferred package manager to install React Code View:
        </p>
        
        <h3>npm</h3>
        <CodeBlock
          language="bash"
          theme={codeTheme}
          code="npm install @react-code-view/react"
        />
        
        <h3>pnpm</h3>
        <CodeBlock
          language="bash"
          theme={codeTheme}
          code="pnpm add @react-code-view/react"
        />
        
        <h3>yarn</h3>
        <CodeBlock
          language="bash"
          theme={codeTheme}
          code="yarn add @react-code-view/react"
        />

        <h3>Import Styles</h3>
        <p>Import the CSS once to enable CodeView, Editor, and Preview styles:</p>
        <CodeBlock
          title="main.tsx"
          language="tsx"
          theme={codeTheme}
          code={`import '@react-code-view/react/styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`}
        />

        <h3>First Live Block with CodeView</h3>
        <CodeBlock
          title="App.tsx"
          language="tsx"
          theme={codeTheme}
          code={`import React from 'react';
import { CodeView } from '@react-code-view/react';

const snippet = ` + "`" + `const App = () => (
  <button onClick={() => alert('Hello!')}>Click me</button>
);

render(<App />);` + "`" + `;

export default function Demo() {
  return (
    <div style={{ maxWidth: 760 }}>
      <h1>Live preview</h1>
      <CodeView
        language="tsx"
        theme="rcv-theme-default"
        dependencies={{ React }}
      >
        {snippet}
      </CodeView>
    </div>
  );
}`}
        />

        <h3>Peer Dependencies</h3>
        <p>React Code View requires the following peer dependencies:</p>
        <ul>
          <li><code>react</code> &gt;= 18.0.0</li>
          <li><code>react-dom</code> &gt;= 18.0.0</li>
        </ul>
      </Section>
    </div>
  );
};
