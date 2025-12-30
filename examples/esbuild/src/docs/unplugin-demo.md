# Unplugin Demo

This markdown is processed by `@react-code-view/unplugin` with **native parseHTML** mode enabled!

## What's Different?

With `useNativeParser: true`, the unplugin:
- ✅ Processes markdown at **build time**
- ✅ Generates a **CodeView component** (not HTML)
- ✅ Uses **parseHTML** at runtime (same as `?raw` import)
- ✅ Provides **type-safe imports**

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
      backgroundColor: '#fef3c7',
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

## Benefits of Unplugin + Native Parser

Combining unplugin with native parseHTML gives you the best of both worlds:

### Build-time Benefits
- 📦 **Type-safe imports** - TypeScript knows the module structure
- 🔧 **Build tool integration** - Works with Vite, Webpack, Rollup, etc.
- 🎯 **Explicit dependencies** - Clear import statements

### Runtime Benefits  
- ⚡ **Native parsing** - Uses the same `parseHTML` logic
- 🎨 **Interactive code** - Automatic code block rendering
- 🔄 **Consistent behavior** - Same as `?raw` imports

## Color Picker Example

Another interactive component to demonstrate the power:

<!--start-code-->

```jsx
function ColorPicker() {
  const [color, setColor] = useState('#3b82f6');
  const [history, setHistory] = useState(['#3b82f6']);
  
  const presetColors = [
    '#ef4444', '#f59e0b', '#10b981', '#3b82f6', 
    '#8b5cf6', '#ec4899', '#6b7280', '#000000'
  ];
  
  const handleColorChange = (newColor) => {
    setColor(newColor);
    if (!history.includes(newColor)) {
      setHistory([...history.slice(-7), newColor]);
    }
  };
  
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <div style={{
          width: '100px',
          height: '100px',
          backgroundColor: color,
          borderRadius: '12px',
          border: '3px solid #e5e7eb',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }} />
        <div>
          <h4 style={{ margin: '0 0 10px' }}>Selected Color</h4>
          <code style={{ 
            fontSize: '18px', 
            fontWeight: 'bold',
            color: color
          }}>
            {color}
          </code>
        </div>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          Pick a color:
        </label>
        <input 
          type="color" 
          value={color}
          onChange={(e) => handleColorChange(e.target.value)}
          style={{ 
            width: '100%', 
            height: '50px', 
            cursor: 'pointer',
            border: 'none',
            borderRadius: '8px'
          }}
        />
      </div>
      
      <div>
        <h4 style={{ marginBottom: '10px' }}>Preset Colors:</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {presetColors.map(c => (
            <button
              key={c}
              onClick={() => handleColorChange(c)}
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: c,
                border: color === c ? '3px solid #000' : '2px solid #e5e7eb',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            />
          ))}
        </div>
      </div>
      
      {history.length > 1 && (
        <div style={{ marginTop: '15px' }}>
          <h4 style={{ marginBottom: '10px' }}>Recent Colors:</h4>
          <div style={{ display: 'flex', gap: '6px' }}>
            {history.map((c, i) => (
              <div
                key={i}
                onClick={() => handleColorChange(c)}
                style={{
                  width: '30px',
                  height: '30px',
                  backgroundColor: c,
                  borderRadius: '6px',
                  cursor: 'pointer',
                  border: '1px solid #e5e7eb'
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

render(<ColorPicker />);
```

<!--end-code-->

## Summary

Using `@react-code-view/unplugin` with `useNativeParser: true`:

1. **Import markdown files** like regular modules
2. **Get type safety** from your build tool
3. **Render interactively** using native parseHTML
4. **Enjoy consistency** across your codebase

Perfect for documentation, tutorials, and interactive examples!
