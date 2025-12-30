'use client';

import React, { useState } from 'react';
import { CodeView } from '@react-code-view/react';

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
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

render(<App />);`,

  toggle: `const App = () => {
  const [isOn, setIsOn] = React.useState(false);
  
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <div
        onClick={() => setIsOn(!isOn)}
        style={{
          width: '60px',
          height: '30px',
          backgroundColor: isOn ? '#4caf50' : '#ccc',
          borderRadius: '15px',
          position: 'relative',
          cursor: 'pointer',
          transition: 'background-color 0.3s'
        }}
      >
        <div
          style={{
            width: '26px',
            height: '26px',
            backgroundColor: 'white',
            borderRadius: '50%',
            position: 'absolute',
            top: '2px',
            left: isOn ? '32px' : '2px',
            transition: 'left 0.3s'
          }}
        />
      </div>
      <p>Status: {isOn ? 'ON' : 'OFF'}</p>
    </div>
  );
};

render(<App />);`
};

export default function BasicPage() {
  const [selectedExample, setSelectedExample] = useState<keyof typeof examples>('counter');
  const [theme, setTheme] = useState('rcv-theme-default');

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Basic CodeView Usage</h1>
      <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px' }}>
        This page demonstrates basic usage of CodeView component with inline code strings
      </p>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <label>Example:</label>
        <select 
          value={selectedExample}
          onChange={e => setSelectedExample(e.target.value as keyof typeof examples)}
          style={{ padding: '8px' }}
        >
          <option value="counter">Counter</option>
          <option value="form">Form</option>
          <option value="toggle">Toggle Switch</option>
        </select>

        <label style={{ marginLeft: '20px' }}>Theme:</label>
        <select 
          value={theme}
          onChange={e => setTheme(e.target.value)}
          style={{ padding: '8px' }}
        >
          <option value="rcv-theme-default">Light</option>
          <option value="rcv-theme-dark">Dark</option>
        </select>
      </div>

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
    </div>
  );
}
