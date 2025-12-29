import React from 'react';
import { FeatureCard } from '../components/FeatureCard';
import { Section } from '../components/Section';
import { CodeView } from '@react-code-view/react';

interface OverviewPageProps {
  theme: string;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ theme }) => {
  const isDark = theme === 'rcv-theme-dark';
  const codeTheme = isDark ? 'github-dark' : 'github-light';

  return (
    <div className="page-content">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">React Code View</h1>
        <p className="hero-description">
          A powerful and flexible code editor and syntax highlighter for React applications.
          Built with modern tools like CodeMirror 6 and Shiki.
        </p>
        <div className="hero-badges">
          <img src="https://img.shields.io/npm/v/@react-code-view/react?style=flat-square" alt="npm version" />
          <img src="https://img.shields.io/npm/dm/@react-code-view/react?style=flat-square" alt="downloads" />
          <img src="https://img.shields.io/github/license/simonguo/react-code-view?style=flat-square" alt="license" />
        </div>
      </div>

      {/* Features */}
      <Section id="features" title="Features">
        <div className="features-grid">
          <FeatureCard
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M8 4l8 8-8 8" stroke="currentColor" strokeWidth="2"/>
              </svg>
            }
            title="Modern Syntax Highlighting"
            description="Powered by Shiki, the same engine as VS Code. Supports 100+ languages and themes."
          />
          <FeatureCard
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M9 9h6M9 15h6" stroke="currentColor" strokeWidth="2"/>
              </svg>
            }
            title="Full-Featured Editor"
            description="CodeMirror 6 integration with line numbers, syntax highlighting, and autocompletion."
          />
          <FeatureCard
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2"/>
              </svg>
            }
            title="Zero Runtime"
            description="Syntax highlighting runs at build time. Ship zero JavaScript for static code blocks."
          />
          <FeatureCard
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l2 7h7l-5.5 4.5 2 7L12 16l-5.5 4.5 2-7L3 9h7z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            }
            title="TypeScript Support"
            description="Written in TypeScript with full type definitions for excellent IDE support."
          />
          <FeatureCard
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2"/>
              </svg>
            }
            title="Markdown Rendering"
            description="Render Markdown with automatic code block syntax highlighting."
          />
          <FeatureCard
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 15l-3-3m0 0l3-3m-3 3h12" stroke="currentColor" strokeWidth="2"/>
              </svg>
            }
            title="Build Tool Integration"
            description="Works seamlessly with Vite, Webpack, Rollup, and esbuild via unplugin."
          />
        </div>
      </Section>

      {/* Quick Example */}
      <Section id="quick-example" title="Quick Example">
        <p className="section-intro">
          Try it yourself! Click "Show Code" to view and edit the source code.
        </p>
        <div className="example-demo">
          <CodeView
            language="tsx"
            theme={theme}
            renderPreview
            showCopyButton
            defaultShowCode
            dependencies={{ React }}
          >
            {`const App = () => {
  const [count, setCount] = React.useState(0);
  
  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h2 style={{ marginBottom: 16 }}>Interactive Counter</h2>
      <p style={{ fontSize: 24, margin: '16px 0' }}>Count: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        style={{
          padding: '10px 20px',
          fontSize: 16,
          borderRadius: 8,
          border: 'none',
          background: '#2da44e',
          color: '#fff',
          cursor: 'pointer'
        }}
      >
        Increment
      </button>
    </div>
  );
};

render(<App />);`}
          </CodeView>
        </div>
      </Section>

      {/* Key Benefits */}
      <Section id="why" title="Why React Code View?">
        <div className="benefits-list">
          <div className="benefit-item">
            <h4>Production Ready</h4>
            <p>Battle-tested in production environments. Thoroughly tested with Jest and React Testing Library.</p>
          </div>
          <div className="benefit-item">
            <h4>Developer Experience</h4>
            <p>Excellent TypeScript support, comprehensive documentation, and intuitive APIs.</p>
          </div>
          <div className="benefit-item">
            <h4>Performance</h4>
            <p>Optimized bundle size with tree-shaking. Lazy loading for heavy dependencies.</p>
          </div>
          <div className="benefit-item">
            <h4>Customizable</h4>
            <p>Extensive theming options. Custom language support. Flexible configuration.</p>
          </div>
        </div>
      </Section>
    </div>
  );
};
