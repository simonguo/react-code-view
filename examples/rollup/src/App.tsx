import React, { useState } from 'react';
import { CodeView } from '@react-code-view/react';
import '@react-code-view/react/styles/index.css';

const examples = {
  modal: `const App = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: '10px 20px',
          cursor: 'pointer',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px'
        }}
      >
        Open Modal
      </button>

      {isOpen && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}
            onClick={() => setIsOpen(false)}
          >
            <div
              style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '8px',
                maxWidth: '500px',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 style={{ marginTop: 0 }}>Modal Title</h2>
              <p>This is a modal dialog. Click outside or the close button to close it.</p>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  marginTop: '20px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

render(<App />);`,

  dropdown: `const App = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState('Select an option');

  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
            backgroundColor: '#f8f9fa',
            border: '1px solid #ddd',
            borderRadius: '4px',
            minWidth: '200px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          {selected}
          <span>{isOpen ? '▲' : '▼'}</span>
        </button>

        {isOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: '4px',
              backgroundColor: 'white',
              border: '1px solid #ddd',
              borderRadius: '4px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              zIndex: 1000
            }}
          >
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelect(option)}
                style={{
                  padding: '10px 20px',
                  cursor: 'pointer',
                  backgroundColor: selected === option ? '#e9ecef' : 'white',
                  borderBottom: index < options.length - 1 ? '1px solid #f0f0f0' : 'none'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = selected === option ? '#e9ecef' : 'white'}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

render(<App />);`,

  tooltip: `const App = () => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <div style={{ padding: '60px', fontFamily: 'sans-serif' }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <button
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Hover me
        </button>

        {showTooltip && (
          <div
            style={{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginBottom: '8px',
              padding: '8px 12px',
              backgroundColor: '#333',
              color: 'white',
              borderRadius: '4px',
              fontSize: '14px',
              whiteSpace: 'nowrap',
              zIndex: 1000
            }}
          >
            This is a tooltip!
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: '6px solid #333'
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

render(<App />);`
};

function App() {
  const [theme, setTheme] = useState<'rcv-theme-default' | 'rcv-theme-dark'>('rcv-theme-default');
  const [selectedExample, setSelectedExample] = useState<keyof typeof examples>('modal');

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
        <h1>React Code View - Rollup Example</h1>
        <p style={{ color: theme === 'rcv-theme-dark' ? '#8b949e' : '#6b7280' }}>
          Live code editing with preview powered by Rollup
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
            <option value="modal">Modal Example</option>
            <option value="dropdown">Dropdown Example</option>
            <option value="tooltip">Tooltip Example</option>
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
            href="https://rollupjs.org" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: theme === 'rcv-theme-dark' ? '#58a6ff' : '#0969da' }}
          >
            Rollup
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
