# Webpack + Unplugin Demo

This markdown is processed by `@react-code-view/unplugin` for Webpack!

## Interactive Timer

Here's a countdown timer component:

<!--start-code-->

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  
  React.useEffect(() => {
    if (!isRunning || seconds === 0) return;
    
    const timer = setInterval(() => {
      setSeconds(s => s - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isRunning, seconds]);
  
  const handleStart = () => {
    if (seconds === 0) setSeconds(10);
    setIsRunning(true);
  };
  
  return (
    <div style={{ 
      padding: '30px', 
      textAlign: 'center',
      backgroundColor: '#fff3cd',
      borderRadius: '12px'
    }}>
      <h2 style={{ 
        fontSize: '48px', 
        margin: '0 0 20px',
        color: seconds <= 3 ? '#dc2626' : '#0369a1'
      }}>
        {seconds}s
      </h2>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button 
          onClick={handleStart}
          disabled={isRunning && seconds > 0}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: isRunning && seconds > 0 ? 'not-allowed' : 'pointer',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            opacity: isRunning && seconds > 0 ? 0.5 : 1
          }}
        >
          Start
        </button>
        <button 
          onClick={() => setIsRunning(false)}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#f59e0b',
            color: 'white',
            border: 'none',
            borderRadius: '6px'
          }}
        >
          Pause
        </button>
        <button 
          onClick={() => {
            setSeconds(10);
            setIsRunning(false);
          }}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '6px'
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

render(<Timer />);
```

<!--end-code-->

## Tabs Component

Another interactive example:

<!--start-code-->

```jsx
function Tabs() {
  const [activeTab, setActiveTab] = useState('home');

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
}

render(<Tabs />);
```

<!--end-code-->

## Benefits

Using `@react-code-view/unplugin` with Webpack:
- ✅ Import markdown files as React components
- ✅ Type-safe imports
- ✅ Automatic code block rendering
- ✅ Works seamlessly with Webpack's module system
