import React from 'react';
import { Section } from '../../components/Section';
import { CodeView } from '@react-code-view/react';

interface TypeScriptExampleProps {
  theme: string;
}

export const TypeScriptExample: React.FC<TypeScriptExampleProps> = ({ theme }) => {
  const typedCode = `interface User {
  id: number;
  name: string;
  email: string;
}

const App = () => {
  const [users, setUsers] = React.useState<User[]>([
    { id: 1, name: 'Ada', email: 'ada@example.com' },
    { id: 2, name: 'Lin', email: 'lin@example.com' }
  ]);

  const add = () => {
    const id = users.length + 1;
    const newUser: User = { 
      id, 
      name: \`User \${id}\`, 
      email: \`user\${id}@example.com\`
    };
    setUsers([...users, newUser]);
  };

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <button onClick={add} style={{ width: 'fit-content', padding: '10px 14px', borderRadius: 8 }}>
        Add user
      </button>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 8 }}>
        {users.map((u: User) => (
          <li key={u.id} style={{ padding: 12, borderRadius: 10, background: '#f6f8fa' }}>
            <strong>{u.name}</strong>
            <div style={{ color: '#57606a', fontSize: 14 }}>{u.email}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

render(<App />);`;

  return (
    <div className="page-content">
      <Section id="typescript" title="TypeScript Example">
        <p>Full TypeScript support with interfaces, generics, and type annotations. Sucrase automatically strips types at runtime.</p>

        <div className="example-demo">
          <CodeView
            language="tsx"
            theme={theme}
            renderPreview
            showCopyButton
            dependencies={{ React }}
            compilerOptions={{ transforms: ['typescript', 'jsx'] }}
          >
            {typedCode}
          </CodeView>
        </div>

        <ul>
          <li>Write real TypeScript code with interfaces and type annotations</li>
          <li>Sucrase automatically removes types for execution</li>
          <li>Full syntax highlighting for TypeScript/TSX</li>
          <li>Perfect for documenting typed APIs and components</li>
        </ul>
      </Section>
    </div>
  );
};
