import React from 'react';
import { Section } from '../../components/Section';
import { CodeBlock } from '../../components/CodeBlock';
import { useCodeExecution } from '@react-code-view/react';

interface UseCodeExecutionExampleProps {
  theme: string;
}

export const UseCodeExecutionExample: React.FC<UseCodeExecutionExampleProps> = ({ theme }) => {
  const isDark = theme === 'rcv-theme-dark';
  const codeTheme = isDark ? 'github-dark' : 'github-light';

  const code = `const Badge = ({ children }) => (
  <span style={{
    padding: '6px 10px',
    borderRadius: 999,
    background: '#eef2ff',
    color: '#4338ca',
    fontWeight: 600
  }}>
    {children}
  </span>
);

const Demo = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <Badge>useCodeExecution</Badge>
    <Badge>renders</Badge>
    <Badge>custom</Badge>
    <Badge>UI</Badge>
  </div>
);

render(<Demo />);`;

  const { element, error } = useCodeExecution(code, {
    dependencies: { React },
    transformOptions: { transforms: ['jsx'] }
  });

  const exampleComponentSource = `import React from 'react';
import { useCodeExecution } from '@react-code-view/react';

const code = \`${code}\`;

export function UseCodeExecutionExample() {
  const { element, error, code: currentCode, updateCode, execute } = useCodeExecution(code, {
    dependencies: { React },
    transformOptions: { transforms: ['jsx'] }
  });

  return (
    <div>
      <div>{error ? error.message : element}</div>
      <button onClick={() => execute(currentCode)}>Run</button>
      <button onClick={() => updateCode(code)}>Reset code</button>
    </div>
  );
}
`;

  return (
    <div className="page-content">
      <Section id="use-code-execution-example" title="useCodeExecution Example">
        <p className="section-intro">
          When you want to execute code strings without the full CodeView UI, use the low-level hook
          <code> useCodeExecution</code>.
        </p>

        <div className="example-demo" style={{ gap: 16 }}>
          <div className="preview-panel">
            {error ? (
              <pre className="error">{error.message}</pre>
            ) : (
              <div>{element}</div>
            )}
          </div>
        </div>

      
        <h4>Full component source</h4>
        <CodeBlock language="tsx" theme={codeTheme} code={exampleComponentSource} />

        <ul>
          <li>Inject dependencies via <code>dependencies</code> (here we pass React).</li>
          <li>Pick a Shiki theme with <code>shikiTheme</code> to match your site.</li>
          <li>Use <code>error</code> to render fallback UI when execution fails.</li>
        </ul>
      </Section>
    </div>
  );
};
