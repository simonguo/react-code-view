# Markdown with Code Examples

This is a demonstration of using CodeView with markdown content that contains embedded code blocks.

## Interactive Button Example

Below is an interactive React component that will be rendered in the middle of this markdown content:

<!--start-code-->

```jsx
function InteractiveButton() {
  const [count, setCount] = useState(0);
  
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h3>Click Counter</h3>
      <button 
        onClick={() => setCount(count + 1)}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Clicked {count} times
      </button>
    </div>
  );
}

render(<InteractiveButton />);
```

<!--end-code-->

## More Content

You can mix markdown content with executable code blocks. The code above is fully interactive and editable!

## Another Example

Here's another interactive component:

<!--start-code-->

```jsx
function ColorfulBox() {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'];
  const [colorIndex, setColorIndex] = useState(0);
  
  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          width: '200px',
          height: '200px',
          backgroundColor: colors[colorIndex],
          borderRadius: '10px',
          margin: '0 auto',
          transition: 'background-color 0.3s ease'
        }}
      />
      <button
        onClick={() => setColorIndex((colorIndex + 1) % colors.length)}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          display: 'block',
          margin: '20px auto',
          cursor: 'pointer'
        }}
      >
        Change Color
      </button>
    </div>
  );
}

render(<ColorfulBox />);
```

<!--end-code-->

## Summary

This demonstrates how CodeView can parse markdown files and render both:
- Regular markdown content (like this text)
- Interactive code blocks (marked with <code>&lt;!--start-code--&gt;</code> and <code>&lt;!--end-code--&gt;</code> )
