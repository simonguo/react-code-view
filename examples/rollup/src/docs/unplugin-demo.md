# Rollup + Unplugin Demo

This markdown is processed by `@react-code-view/unplugin` for Rollup!

## Color Picker

An interactive color picker component:

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

## Accordion Component

<!--start-code-->

```jsx
function Accordion() {
  const [openItems, setOpenItems] = useState([]);

  const items = [
    { id: 1, title: 'What is React?', content: 'React is a JavaScript library for building user interfaces.' },
    { id: 2, title: 'What is Rollup?', content: 'Rollup is a module bundler for JavaScript which compiles small pieces of code into something larger and more complex.' },
    { id: 3, title: 'What is CodeView?', content: 'CodeView is a component for live code editing and preview with syntax highlighting.' }
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
}

render(<Accordion />);
```

<!--end-code-->

## Benefits

Using `@react-code-view/unplugin` with Rollup:
- ✅ Tree-shakeable output
- ✅ Import markdown as components
- ✅ Optimized bundle size
- ✅ ES module format
