import React from 'react';
import { Section } from '../../components/Section';
import { CodeView } from '@react-code-view/react';

interface TodoExampleProps {
  theme: string;
}

export const TodoExample: React.FC<TodoExampleProps> = ({ theme }) => {
  const todoCode = `const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', done: true },
    { id: 2, text: 'Ship CodeView docs', done: false }
  ]);
  const [input, setInput] = useState('');

  const add = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput('');
  };

  return (
    <div style={{ maxWidth: 360, display: 'grid', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()}
          style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #d0d7de' }}
          placeholder="Add todo"
        />
        <button onClick={add} style={{ padding: '10px 14px', borderRadius: 8 }}>Add</button>
      </div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 8 }}>
        {todos.map(todo => (
          <li
            key={todo.id}
            onClick={() => setTodos(ts => ts.map(t => t.id === todo.id ? { ...t, done: !t.done } : t))}
            style={{
              padding: '10px 12px',
              borderRadius: 10,
              background: '#f6f8fa',
              textDecoration: todo.done ? 'line-through' : 'none',
              opacity: todo.done ? 0.6 : 1,
              cursor: 'pointer'
            }}
          >
            {todo.done ? '\u2713' : '\u25cb'} {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

render(<App />);`;

  return (
    <div className="page-content">
      <Section id="todo" title="Todo List">
        <p>An interactive todo list demonstrating state management and event handling.</p>
        
        <div className="example-demo">
          <CodeView
            language="tsx"
            theme={theme}
            renderPreview
            showCopyButton
            dependencies={{ useState: React.useState }}
          >
            {todoCode}
          </CodeView>
        </div>

        <ul>
          <li>Real React state with multiple interactions</li>
          <li>Add todos by typing and pressing Enter</li>
          <li>Click todos to toggle completion status</li>
          <li>Edit code to modify behavior instantly</li>
        </ul>
      </Section>
    </div>
  );
};
