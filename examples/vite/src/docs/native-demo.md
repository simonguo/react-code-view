# Native Markdown Parsing Demo

CodeView now supports **native markdown parsing** without requiring build-time transformation!

## Interactive Counter

Here's a simple counter component embedded in markdown:

<!--start-code-->

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div style={{ 
      padding: '24px', 
      textAlign: 'center',
      backgroundColor: '#f0f9ff',
      borderRadius: '8px'
    }}>
      <h3 style={{ margin: '0 0 16px', color: '#0369a1' }}>Counter: {count}</h3>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <button 
          onClick={() => setCount(count - 1)}
          style={{
            padding: '8px 16px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '6px'
          }}
        >
          -
        </button>
        <button 
          onClick={() => setCount(count + 1)}
          style={{
            padding: '8px 16px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px'
          }}
        >
          +
        </button>
        <button 
          onClick={() => setCount(0)}
          style={{
            padding: '8px 16px',
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

render(<Counter />);
```

<!--end-code-->

## How It Works

The native parsing approach:
- **No build step required** - Works at runtime
- **Import as raw text** - Use Vite's `?raw` suffix
- **Automatic detection** - CodeView detects &lt;!--start-code--&gt; markers
- **Mixed content** - Combine markdown and interactive code seamlessly

## Todo List Example

Another interactive example - a simple todo list:

<!--start-code-->

```jsx
function TodoList() {
  const [todos, setTodos] = useState(['Learn React', 'Build something awesome']);
  const [input, setInput] = useState('');
  
  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input]);
      setInput('');
    }
  };
  
  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };
  
  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h3 style={{ marginTop: 0 }}>My Todos</h3>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
          style={{ 
            flex: 1, 
            padding: '8px 12px', 
            border: '1px solid #d1d5db',
            borderRadius: '6px'
          }}
        />
        <button 
          onClick={addTodo}
          style={{
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Add
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo, index) => (
          <li 
            key={index}
            style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              marginBottom: '8px',
              backgroundColor: '#f9fafb',
              borderRadius: '6px',
              border: '1px solid #e5e7eb'
            }}
          >
            <span>{todo}</span>
            <button 
              onClick={() => removeTodo(index)}
              style={{
                padding: '4px 12px',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

render(<TodoList />);
```

<!--end-code-->

## Summary

Native markdown parsing makes it easy to:
- ✅ Write documentation with live examples
- ✅ No build configuration needed
- ✅ Edit code in real-time
- ✅ Mix markdown content with interactive demos
