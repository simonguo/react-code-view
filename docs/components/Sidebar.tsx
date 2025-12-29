import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };
  
  const sections = [
    {
      title: 'Getting Started',
      items: [
        { path: '/', label: 'Overview' },
        { path: '/installation', label: 'Installation' },
        { path: '/quick-start', label: 'Quick Start' },
      ]
    },
    {
      title: 'Components',
      items: [
        { path: '/components/code-view', label: 'CodeView' },
        { path: '/components/code-editor', label: 'CodeEditor' },
        { path: '/components/renderer', label: 'Renderer' },
        { path: '/components/markdown-renderer', label: 'MarkdownRenderer' },
        { path: '/components/use-code-execution', label: 'useCodeExecution (hook)' },
      ]
    },
    {
      title: 'Build Tools',
      items: [
        { path: '/build-tools/vite', label: 'Vite' },
        { path: '/build-tools/webpack', label: 'Webpack' },
        { path: '/build-tools/rollup', label: 'Rollup' },
        { path: '/build-tools/esbuild', label: 'esbuild' },
      ]
    },
    {
      title: 'Examples',
      items: [
        { path: '/examples/counter', label: 'Counter' },
        { path: '/examples/todo', label: 'Todo List' },
        { path: '/examples/typescript', label: 'TypeScript' },
        { path: '/examples/theme', label: 'Theme Switcher' },
        { path: '/examples/components', label: 'Custom Components' },
        { path: '/examples/use-code-execution', label: 'useCodeExecution' },
      ]
    }
  ];

  return (
    <aside className="docs-sidebar">
      <div className="sidebar-content">
        {sections.map(section => (
          <div key={section.title} className="sidebar-section">
            <h3 className="sidebar-title">{section.title}</h3>
            <ul className="sidebar-list">
              {section.items.map(item => (
                <li key={item.path}>
                  <Link 
                    to={item.path}
                    onClick={handleLinkClick}
                    className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};
