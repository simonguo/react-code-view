import React from 'react';
import { Section } from '../components/Section';
import { CodeBlock } from '../components/CodeBlock';

interface UseCodeExecutionPageProps {
  theme: string;
}

export const UseCodeExecutionPage: React.FC<UseCodeExecutionPageProps> = ({ theme }) => {
  const isDark = theme === 'rcv-theme-dark';
  const codeTheme = isDark ? 'github-dark' : 'github-light';

  const minimalExample = `import React from 'react';
import { useCodeExecution } from '@react-code-view/react';

const initialCode = \`const Hello = () => <button onClick={() => alert('hi!')}>Click</button>;
render(<Hello />);\`;

export function Demo() {
  const { element, error } = useCodeExecution(initialCode, {
    dependencies: { React },
  });

  if (error) return <pre>{error.message}</pre>;
  return <>{element}</>;
}
`;

  const advancedExample = `import React from 'react';
import { useCodeExecution } from '@react-code-view/react';

const initialCode = \`import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

render(<Counter />);\`;

export function Demo() {
  const { element, error, execute, updateCode } = useCodeExecution(initialCode, {
    dependencies: { React },
    onError: (err) => console.error('Execution failed', err),
    transformOptions: { transforms: ['typescript', 'jsx'] },
  });

  // Manually re-run after editing the string
  const handleRun = () => execute(initialCode);

  if (error) return <pre>{error.message}</pre>;
  return (
    <div>
      <button onClick={handleRun}>Run</button>
      <div style={{ marginTop: 12 }}>{element}</div>
    </div>
  );
}
`;

  const optionsTable = [
    { name: 'dependencies', type: 'Record<string, unknown>', desc: 'Globals injected to execution sandbox' },
    { name: 'transformOptions', type: 'Sucrase Options', desc: 'Customize JSX/TS transforms' },
    { name: 'beforeCompile', type: '(code: string) => string', desc: 'Transform code before compile' },
    { name: 'afterCompile', type: '(code: string) => string', desc: 'Transform code after compile' },
    { name: 'onError', type: '(error: Error) => void', desc: 'Callback on execution failure' },
  ];

  return (
    <div className="page-content">
      <Section id="use-code-execution" title="useCodeExecution (hook)">
        <p className="section-intro">
          Lower-level hook used by CodeView to execute code strings, inject dependencies, and return rendered HTML.
        </p>

        <h3>When to use</h3>
        <ul>
          <li>Custom rendering pipeline without the full CodeView UI.</li>
          <li>Server-rendered or pre-rendered demos where you handle layout yourself.</li>
          <li>Embedding execution output into existing docs components.</li>
        </ul>

        <h3>Minimal example</h3>
        <CodeBlock language="tsx" theme={codeTheme} code={minimalExample} />

        <h3>With dependencies and error handling</h3>
        <CodeBlock language="tsx" theme={codeTheme} code={advancedExample} />

        <h3>Options</h3>
        <div className="api-table-wrapper">
          <table className="api-table">
            <thead>
              <tr>
                <th>Option</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {optionsTable.map(row => (
                <tr key={row.name}>
                  <td><code>{row.name}</code></td>
                  <td><code>{row.type}</code></td>
                  <td>{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3>Return value</h3>
        <ul>
          <li><code>element</code>: ReactNode — captured React output</li>
          <li><code>error</code>: Error | null — execution error, if any</li>
          <li><code>code</code>: string — current code string</li>
          <li><code>setCode / updateCode</code>: setter to change code (re-runs)</li>
          <li><code>execute</code>: function to manually run a code string</li>
        </ul>
      </Section>
    </div>
  );
};
