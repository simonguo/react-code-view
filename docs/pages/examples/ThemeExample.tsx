import React from 'react';
import { Section } from '../../components/Section';
import { CodeView } from '@react-code-view/react';

interface ThemeExampleProps {
  theme: string;
}

export const ThemeExample: React.FC<ThemeExampleProps> = ({ theme }) => {
  const themeCode = `const App = () => {
  const [isDark, setIsDark] = React.useState(false);
  
  const themeVars = {
    '--bg-primary': isDark ? '#0d1117' : '#ffffff',
    '--bg-secondary': isDark ? '#161b22' : '#f6f8fa',
    '--text-primary': isDark ? '#e6edf3' : '#24292f',
    '--text-secondary': isDark ? '#8b949e' : '#57606a',
    '--border-color': isDark ? '#30363d' : '#d0d7de',
    '--btn-bg': isDark ? '#238636' : '#2da44e',
  };
  
  return (
    <div style={{
      ...themeVars,
      padding: 24,
      borderRadius: 12,
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-color)',
      transition: 'all 0.3s ease'
    }}>
      <h2 style={{ margin: '0 0 16px', fontSize: 20 }}>
        Theme Switcher
      </h2>
      <p style={{ margin: '0 0 16px', color: 'var(--text-secondary)' }}>
        Click the button to toggle between light and dark themes using CSS variables.
      </p>
      <button
        onClick={() => setIsDark(!isDark)}
        style={{
          padding: '10px 20px',
          borderRadius: 8,
          border: 'none',
          background: 'var(--btn-bg)',
          color: '#ffffff',
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'background 0.2s ease'
        }}
      >
        {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
      <div style={{
        marginTop: 16,
        padding: 12,
        borderRadius: 8,
        background: 'var(--bg-secondary)',
        fontSize: 14
      }}>
        Current theme: <strong>{isDark ? 'Dark' : 'Light'}</strong>
      </div>
    </div>
  );
};

render(<App />);`;

  return (
    <div className="page-content">
      <Section id="theme" title="Theme Switcher">
        <p>Demonstrate dynamic theme switching inside your live examples.</p>

        <div className="example-demo">
          <CodeView
            language="tsx"
            theme={theme}
            renderPreview
            showCopyButton
            dependencies={{ React }}
          >
            {themeCode}
          </CodeView>
        </div>

        <ul>
          <li>Use CSS variables for dynamic theming</li>
          <li>Toggle between light and dark color schemes</li>
          <li>Cleaner and more maintainable code</li>
          <li>Perfect for documenting theme-aware components</li>
        </ul>
      </Section>
    </div>
  );
};
