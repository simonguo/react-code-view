import React, { useState } from 'react';
import { CodeView } from '@react-code-view/react';
import '@react-code-view/react/styles/index.css';

const examples = {
  timer: `const App = () => {
  const [seconds, setSeconds] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);

  React.useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Timer: {seconds}s</h2>
      <button 
        onClick={() => setIsRunning(!isRunning)}
        style={{
          padding: '10px 20px',
          marginRight: '10px',
          cursor: 'pointer',
          backgroundColor: isRunning ? '#dc3545' : '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px'
        }}
      >
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button 
        onClick={() => setSeconds(0)}
        style={{
          padding: '10px 20px',
          cursor: 'pointer',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px'
        }}
      >
        Reset
      </button>
    </div>
  );
};

render(<App />);`,

  tabs: `const App = () => {
  const [activeTab, setActiveTab] = React.useState('home');

  const tabs = [
    { id: 'home', label: 'Home', content: 'Welcome to the home page!' },
    { id: 'profile', label: 'Profile', content: 'This is your profile.' },
    { id: 'settings', label: 'Settings', content: 'Manage your settings here.' },
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ borderBottom: '2px solid #e0e0e0', marginBottom: '20px' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 20px',
              marginRight: '5px',
              cursor: 'pointer',
              backgroundColor: activeTab === tab.id ? '#007bff' : 'transparent',
              color: activeTab === tab.id ? 'white' : '#333',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid #007bff' : 'none',
              borderRadius: '4px 4px 0 0'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        {tabs.find(t => t.id === activeTab)?.content}
      </div>
    </div>
  );
};

render(<App />);`,

  accordion: `const App = () => {
  const [openItems, setOpenItems] = React.useState([]);

  const items = [
    { id: 1, title: 'What is React?', content: 'React is a JavaScript library for building user interfaces.' },
    { id: 2, title: 'What is CodeView?', content: 'CodeView is a component for live code editing and preview.' },
    { id: 3, title: 'What is Webpack?', content: 'Webpack is a module bundler for JavaScript applications.' }
  ];

  const toggleItem = (id) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px' }}>
      {items.map(item => (
        <div 
          key={item.id} 
          style={{ 
            marginBottom: '10px', 
            border: '1px solid #ddd',
            borderRadius: '4px',
            overflow: 'hidden'
          }}
        >
          <button
            onClick={() => toggleItem(item.id)}
            style={{
              width: '100%',
              padding: '15px',
              textAlign: 'left',
              cursor: 'pointer',
              backgroundColor: '#f8f9fa',
              border: 'none',
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            {item.title}
            <span>{openItems.includes(item.id) ? '▲' : '▼'}</span>
          </button>
          {openItems.includes(item.id) && (
            <div style={{ padding: '15px', backgroundColor: 'white' }}>
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

render(<App />);`
};

function App() {
  const [theme, setTheme] = useState<'rcv-theme-default' | 'rcv-theme-dark'>('rcv-theme-default');
  const [selectedExample, setSelectedExample] = useState<keyof typeof examples>('timer');

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
        <h1>React Code View - Webpack Example</h1>
        <p style={{ color: theme === 'rcv-theme-dark' ? '#8b949e' : '#6b7280' }}>
          Live code editing with preview powered by Webpack
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
            <option value="timer">Timer Example</option>
            <option value="tabs">Tabs Example</option>
            <option value="accordion">Accordion Example</option>
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
            href="https://webpack.js.org" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: theme === 'rcv-theme-dark' ? '#58a6ff' : '#0969da' }}
          >
            Webpack
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
