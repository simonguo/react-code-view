import React, { useState } from 'react';
import { CodeView } from '@react-code-view/react';
import '@react-code-view/react/styles/index.css';

const examples = {
  toast: `const App = () => {
  const [toasts, setToasts] = React.useState([]);

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const colors = {
    info: { bg: '#007bff', text: 'white' },
    success: { bg: '#28a745', text: 'white' },
    warning: { bg: '#ffc107', text: '#333' },
    error: { bg: '#dc3545', text: 'white' },
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => showToast('Info message', 'info')} style={{ margin: '5px', padding: '8px 16px', cursor: 'pointer' }}>
          Show Info
        </button>
        <button onClick={() => showToast('Success!', 'success')} style={{ margin: '5px', padding: '8px 16px', cursor: 'pointer' }}>
          Show Success
        </button>
        <button onClick={() => showToast('Warning!', 'warning')} style={{ margin: '5px', padding: '8px 16px', cursor: 'pointer' }}>
          Show Warning
        </button>
        <button onClick={() => showToast('Error!', 'error')} style={{ margin: '5px', padding: '8px 16px', cursor: 'pointer' }}>
          Show Error
        </button>
      </div>

      <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999 }}>
        {toasts.map(toast => (
          <div
            key={toast.id}
            style={{
              marginBottom: '10px',
              padding: '12px 20px',
              backgroundColor: colors[toast.type].bg,
              color: colors[toast.type].text,
              borderRadius: '4px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              minWidth: '250px',
              animation: 'slideIn 0.3s ease-out'
            }}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
};

render(<App />);`,

  progress: `const App = () => {
  const [progress, setProgress] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);

  React.useEffect(() => {
    let interval;
    if (isRunning && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + 1;
          if (next >= 100) {
            setIsRunning(false);
            return 100;
          }
          return next;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isRunning, progress]);

  const start = () => {
    setProgress(0);
    setIsRunning(true);
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h3>Progress Bar Demo</h3>
      
      <div style={{ marginTop: '20px', marginBottom: '10px' }}>
        <div style={{
          width: '100%',
          height: '30px',
          backgroundColor: '#e0e0e0',
          borderRadius: '15px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            width: progress + '%',
            height: '100%',
            backgroundColor: progress === 100 ? '#28a745' : '#007bff',
            transition: 'width 0.1s ease, background-color 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            {progress > 10 && progress + '%'}
          </div>
        </div>
      </div>

      <button
        onClick={start}
        disabled={isRunning}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          cursor: isRunning ? 'not-allowed' : 'pointer',
          backgroundColor: isRunning ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px'
        }}
      >
        {isRunning ? 'Running...' : progress === 100 ? 'Restart' : 'Start'}
      </button>
    </div>
  );
};

render(<App />);`,

  slider: `const App = () => {
  const [value, setValue] = React.useState(50);
  const [color, setColor] = React.useState({ r: 128, g: 128, b: 128 });

  const handleSliderChange = (e) => {
    setValue(Number(e.target.value));
  };

  const handleColorChange = (channel, val) => {
    setColor(prev => ({ ...prev, [channel]: Number(val) }));
  };

  const rgbString = \`rgb(\${color.r}, \${color.g}, \${color.b})\`;

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '600px' }}>
      <h3>Interactive Sliders</h3>
      
      <div style={{ marginTop: '30px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
          Value: {value}
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={handleSliderChange}
          style={{ width: '100%', height: '8px', cursor: 'pointer' }}
        />
        <div style={{
          marginTop: '15px',
          padding: '20px',
          backgroundColor: '#f0f0f0',
          borderRadius: '8px',
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          {value}
        </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h4>RGB Color Mixer</h4>
        {['r', 'g', 'b'].map(channel => (
          <div key={channel} style={{ marginTop: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', textTransform: 'uppercase' }}>
              {channel}: {color[channel]}
            </label>
            <input
              type="range"
              min="0"
              max="255"
              value={color[channel]}
              onChange={(e) => handleColorChange(channel, e.target.value)}
              style={{ width: '100%', height: '6px', cursor: 'pointer' }}
            />
          </div>
        ))}
        <div style={{
          marginTop: '20px',
          height: '100px',
          backgroundColor: rgbString,
          borderRadius: '8px',
          border: '2px solid #ddd'
        }} />
        <p style={{ marginTop: '10px', textAlign: 'center', color: '#666' }}>
          {rgbString}
        </p>
      </div>
    </div>
  );
};

render(<App />);`
};

function App() {
  const [theme, setTheme] = useState<'rcv-theme-default' | 'rcv-theme-dark'>('rcv-theme-default');
  const [selectedExample, setSelectedExample] = useState<keyof typeof examples>('toast');

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
        <h1>React Code View - esbuild Example</h1>
        <p style={{ color: theme === 'rcv-theme-dark' ? '#8b949e' : '#6b7280' }}>
          ⚡ Lightning fast builds with esbuild
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
            <option value="toast">Toast Notifications</option>
            <option value="progress">Progress Bar</option>
            <option value="slider">Interactive Sliders</option>
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
            href="https://esbuild.github.io" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: theme === 'rcv-theme-dark' ? '#58a6ff' : '#0969da' }}
          >
            esbuild
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
