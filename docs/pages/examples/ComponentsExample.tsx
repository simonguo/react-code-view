import React from 'react';
import { Section } from '../../components/Section';
import { CodeView } from '@react-code-view/react';

interface ComponentsExampleProps {
  theme: string;
}

export const ComponentsExample: React.FC<ComponentsExampleProps> = ({ theme }) => {
  const componentsCode = `const Button = ({ onClick, children }) => (
  <button
    onClick={onClick}
    style={{
      padding: '10px 16px',
      borderRadius: 10,
      border: '1px solid #d0d7de',
      background: '#0d6efd',
      color: '#fff',
      cursor: 'pointer',
      fontSize: 14,
      fontWeight: 600
    }}
  >
    {children}
  </button>
);

const Card = ({ title, children }) => (
  <div style={{
    padding: 18,
    borderRadius: 12,
    border: '1px solid #e1e4e8',
    background: '#fff',
    boxShadow: '0 4px 14px rgba(0,0,0,0.06)'
  }}>
    <h3 style={{ margin: '0 0 8px', fontSize: 18 }}>{title}</h3>
    <div style={{ color: '#57606a' }}>{children}</div>
  </div>
);

const App = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('React');

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <Card title={\`Hello, \${name}!\`}>
        <p style={{ margin: '0 0 12px' }}>Live editable preview. Update code and see changes instantly.</p>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Button onClick={() => setCount(c => c + 1)}>Clicked {count} times</Button>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #d0d7de' }}
          />
        </div>
      </Card>
    </div>
  );
};

render(<App />);`;

  return (
    <div className="page-content">
      <Section id="components" title="Custom Components">
        <p>Build reusable components and compose them together in live examples.</p>

        <div className="example-demo">
          <CodeView
            language="tsx"
            theme={theme}
            renderPreview
            showCopyButton
            dependencies={{ useState: React.useState }}
          >
            {componentsCode}
          </CodeView>
        </div>

        <ul>
          <li>Define multiple components (Button, Card)</li>
          <li>Compose components together</li>
          <li>Edit any part and see instant updates</li>
          <li>Perfect for component library documentation</li>
        </ul>
      </Section>
    </div>
  );
};
