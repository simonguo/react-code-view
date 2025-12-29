import React, { useState } from 'react';
import { CodeView } from '@react-code-view/react';
import '@react-code-view/react/styles/index.css';

const examples = {
  counter: `const App = () => {
  const [count, setCount] = React.useState(0);
  
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Counter: {count}</h2>
      <button 
        onClick={() => setCount(count + 1)}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px'
        }}
      >
        Increment
      </button>
    </div>
  );
};

render(<App />);`,

  form: `const App = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h3>Form Submitted!</h3>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <button onClick={() => setSubmitted(false)}>Reset</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ display: 'block', width: '100%', padding: '8px' }}
            required
          />
        </label>
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ display: 'block', width: '100%', padding: '8px' }}
            required
          />
        </label>
      </div>
      <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Submit
      </button>
    </form>
  );
};

render(<App />);`,

  list: `const App = () => {
  const [items, setItems] = React.useState(['Apple', 'Banana', 'Orange']);
  const [newItem, setNewItem] = React.useState('');

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem]);
      setNewItem('');
    }
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h3>Fruit List</h3>
      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item..."
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <button onClick={addItem} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Add
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map((item, index) => (
          <li key={index} style={{ 
            padding: '10px', 
            marginBottom: '5px', 
            backgroundColor: '#f0f0f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            {item}
            <button 
              onClick={() => removeItem(index)}
              style={{ 
                padding: '4px 12px', 
                cursor: 'pointer',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '3px'
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

render(<App />);`
};

function App() {
  const [theme, setTheme] = useState<'rcv-theme-default' | 'rcv-theme-dark'>('rcv-theme-default');
  const [selectedExample, setSelectedExample] = useState<keyof typeof examples>('counter');

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: theme === 'rcv-theme-dark' ? '#0d1117' : '#ffffff',
      color: theme === 'rcv-theme-dark' ? '#e6edf3' : '#1f2937',
      padding: '20px'
    }}>
      <header style={{ 
        maxWidth: '1200px', 
        margin: '0 auto 40px',
        borderBottom: theme === 'rcv-theme-dark' ? '1px solid #30363d' : '1px solid #e5e7eb',
        paddingBottom: '20px'
      }}>
        <h1>React Code View - Vite Example</h1>
        <p style={{ color: theme === 'rcv-theme-dark' ? '#8b949e' : '#6b7280' }}>
          Live code editing with preview powered by Vite
        </p>
        
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={() => setTheme(theme === 'rcv-theme-dark' ? 'rcv-theme-default' : 'rcv-theme-dark')}
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              backgroundColor: theme === 'rcv-theme-dark' ? '#21262d' : '#f6f8fa',
              color: theme === 'rcv-theme-dark' ? '#e6edf3' : '#1f2937',
              border: theme === 'rcv-theme-dark' ? '1px solid #30363d' : '1px solid #d0d7de',
              borderRadius: '6px'
            }}
          >
            {theme === 'rcv-theme-dark' ? '☀️ Light' : '🌙 Dark'}
          </button>

          <select
            value={selectedExample}
            onChange={(e) => setSelectedExample(e.target.value as keyof typeof examples)}
            style={{
              padding: '8px 12px',
              cursor: 'pointer',
              backgroundColor: theme === 'rcv-theme-dark' ? '#21262d' : '#f6f8fa',
              color: theme === 'rcv-theme-dark' ? '#e6edf3' : '#1f2937',
              border: theme === 'rcv-theme-dark' ? '1px solid #30363d' : '1px solid #d0d7de',
              borderRadius: '6px'
            }}
          >
            <option value="counter">Counter Example</option>
            <option value="form">Form Example</option>
            <option value="list">List Example</option>
          </select>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <CodeView
          key={selectedExample}
          language="jsx"
          theme={theme}
          dependencies={{ React }}
          editable
          showCopyButton
          defaultShowCode
        >
          {examples[selectedExample]}
        </CodeView>
      </main>

      <footer style={{ 
        maxWidth: '1200px', 
        margin: '40px auto 0',
        paddingTop: '20px',
        borderTop: theme === 'rcv-theme-dark' ? '1px solid #30363d' : '1px solid #e5e7eb',
        textAlign: 'center',
        color: theme === 'rcv-theme-dark' ? '#8b949e' : '#6b7280'
      }}>
        <p>
          Built with{' '}
          <a 
            href="https://vitejs.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: theme === 'rcv-theme-dark' ? '#58a6ff' : '#0969da' }}
          >
            Vite
          </a>
          {' '}and{' '}
          <a 
            href="https://github.com/simonguo/react-code-view" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: theme === 'rcv-theme-dark' ? '#58a6ff' : '#0969da' }}
          >
            React Code View
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
