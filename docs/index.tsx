import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@react-code-view/react/styles/index.css';
import './styles/index.css';
import { initHighlighter } from '@react-code-view/core';

// Components
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';

// Pages
import { OverviewPage } from './pages/OverviewPage';
import { InstallationPage } from './pages/InstallationPage';
import { QuickStartPage } from './pages/QuickStartPage';
import { ComponentsPage } from './pages/ComponentsPage';
import { BuildToolsPage } from './pages/BuildToolsPage';
import { UseCodeExecutionPage } from './pages/UseCodeExecutionPage';

// Examples
import { CounterExample } from './pages/examples/CounterExample';
import { TodoExample } from './pages/examples/TodoExample';
import { TypeScriptExample } from './pages/examples/TypeScriptExample';
import { ThemeExample } from './pages/examples/ThemeExample';
import { ComponentsExample } from './pages/examples/ComponentsExample';
import { UseCodeExecutionExample } from './pages/examples/UseCodeExecutionExample';
import { MarkdownExample } from './pages/examples/MarkdownExample';

// Pre-initialize Shiki for faster first render
initHighlighter();

const App: React.FC = () => {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('theme') || 'rcv-theme-default';
  });

  const isDark = theme === 'rcv-theme-dark';

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    const newTheme = isDark ? 'rcv-theme-default' : 'rcv-theme-dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <BrowserRouter>
      <div className={`docs-app ${theme}`}>
        <Header theme={theme} onThemeToggle={toggleTheme} />
        
        <div className="docs-layout">
          <Sidebar />
          
          <main className="docs-main">
            <Routes>
              <Route path="/" element={<OverviewPage theme={theme} />} />
              <Route path="/installation" element={<InstallationPage theme={theme} />} />
              <Route path="/quick-start" element={<QuickStartPage theme={theme} />} />
              <Route path="/components/:component" element={<ComponentsPage theme={theme} />} />
              <Route path="/components/use-code-execution" element={<UseCodeExecutionPage theme={theme} />} />
              <Route path="/build-tools/:tool" element={<BuildToolsPage theme={theme} />} />
              <Route path="/examples/counter" element={<CounterExample theme={theme} />} />
              <Route path="/examples/todo" element={<TodoExample theme={theme} />} />
              <Route path="/examples/typescript" element={<TypeScriptExample theme={theme} />} />
              <Route path="/examples/theme" element={<ThemeExample theme={theme} />} />
              <Route path="/examples/components" element={<ComponentsExample theme={theme} />} />
              <Route path="/examples/use-code-execution" element={<UseCodeExecutionExample theme={theme} />} />
              <Route path="/examples/markdown" element={<MarkdownExample theme={theme} />} />
            </Routes>
          </main>
        </div>
        
        <footer className="docs-footer">
          <div className="footer-container">
            <div className="footer-content">
              <p>Built with ❤️ using React, CodeMirror 6, and Shiki</p>
              <p className="footer-links">
                <a href="https://github.com/simonguo/react-code-view" target="_blank" rel="noopener noreferrer">GitHub</a>
                <span>·</span>
                <a href="https://www.npmjs.com/package/@react-code-view/react" target="_blank" rel="noopener noreferrer">npm</a>
                <span>·</span>
                <a href="https://github.com/simonguo/react-code-view/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">MIT License</a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
