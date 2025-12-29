import React from 'react';
import { useParams } from 'react-router-dom';
import { Section } from '../components/Section';
import { CodeBlock } from '../components/CodeBlock';

interface BuildToolsPageProps {
  theme: string;
}

export const BuildToolsPage: React.FC<BuildToolsPageProps> = ({ theme }) => {
  const { tool } = useParams<{ tool: string }>();
  const isDark = theme === 'rcv-theme-dark';
  const codeTheme = isDark ? 'github-dark' : 'github-light';

  if (tool === 'vite') {
    return (
      <div className="page-content">
        <Section id="vite" title="Vite Integration">
          <p className="section-intro">
            Configure Vite so CodeView runs live previews (Shiki + CodeMirror) smoothly.
          </p>

          <h3>Installation</h3>
          <CodeBlock
            language="bash"
            theme={codeTheme}
            code="npm install @react-code-view/unplugin -D"
          />

          <h3>Configuration</h3>
          <CodeBlock
            title="vite.config.ts"
            language="typescript"
            theme={codeTheme}
            code={`import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { unplugin } from '@react-code-view/unplugin';

export default defineConfig({
  plugins: [
    react(),
    unplugin.vite(),
  ],
  optimizeDeps: {
    include: ['@react-code-view/react']
  }
});`}
          />

          <h3>Use CodeView</h3>
          <CodeBlock
            title="App.tsx"
            language="tsx"
            theme={codeTheme}
            code={`import { CodeView } from '@react-code-view/react';
import '@react-code-view/react/styles/index.css';

const snippet = ` + "`" + `const App = () => <button>Hi</button>;
render(<App />);` + "`" + `;

export default () => (
  <CodeView language="tsx" dependencies={{ React }}>
    {snippet}
  </CodeView>
);`}
          />

          <h3>Why Use the Plugin?</h3>
          <ul>
            <li>✅ Optimizes Shiki WASM module loading</li>
            <li>✅ Improves build performance</li>
            <li>✅ Reduces bundle size</li>
            <li>✅ Better tree-shaking</li>
          </ul>
        </Section>
      </div>
    );
  }

  if (tool === 'webpack') {
    return (
      <div className="page-content">
        <Section id="webpack" title="Webpack Integration">
          <p className="section-intro">
            Configure Webpack so CodeView live previews work out of the box.
          </p>

          <h3>Installation</h3>
          <CodeBlock
            language="bash"
            theme={codeTheme}
            code="npm install @react-code-view/unplugin -D"
          />

          <h3>Configuration</h3>
          <CodeBlock
            title="webpack.config.js"
            language="javascript"
            theme={codeTheme}
            code={`const { unplugin } = require('@react-code-view/unplugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    unplugin.webpack(),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};`}
          />

          <h3>Use CodeView</h3>
          <CodeBlock
            title="App.tsx"
            language="tsx"
            theme={codeTheme}
            code={`import { CodeView } from '@react-code-view/react';
import '@react-code-view/react/styles/index.css';

const snippet = ` + "`" + `const App = () => <button>Hi</button>;
render(<App />);` + "`" + `;

export default () => (
  <CodeView language="tsx" dependencies={{ React }}>
    {snippet}
  </CodeView>
);`}
          />

          <h3>Features</h3>
          <ul>
            <li>✅ Automatic WASM handling</li>
            <li>✅ CSS module support</li>
            <li>✅ Tree-shaking optimization</li>
          </ul>
        </Section>
      </div>
    );
  }

  if (tool === 'rollup') {
    return (
      <div className="page-content">
        <Section id="rollup" title="Rollup Integration">
          <p className="section-intro">
            Configure Rollup for CodeView live previews.
          </p>

          <h3>Installation</h3>
          <CodeBlock
            language="bash"
            theme={codeTheme}
            code="npm install @react-code-view/unplugin -D"
          />

          <h3>Configuration</h3>
          <CodeBlock
            title="rollup.config.js"
            language="javascript"
            theme={codeTheme}
            code={`import { unplugin } from '@react-code-view/unplugin';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es'
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    unplugin.rollup(),
  ]
};`}
          />

          <h3>Use CodeView</h3>
          <CodeBlock
            title="App.tsx"
            language="tsx"
            theme={codeTheme}
            code={`import { CodeView } from '@react-code-view/react';
import '@react-code-view/react/styles/index.css';

const snippet = ` + "`" + `const App = () => <button>Hi</button>;
render(<App />);` + "`" + `;

export default () => (
  <CodeView language="tsx" dependencies={{ React }}>
    {snippet}
  </CodeView>
);`}
          />
        </Section>
      </div>
    );
  }

  if (tool === 'esbuild') {
    return (
      <div className="page-content">
        <Section id="esbuild" title="esbuild Integration">
          <p className="section-intro">
            Configure esbuild so CodeView live previews compile correctly.
          </p>

          <h3>Installation</h3>
          <CodeBlock
            language="bash"
            theme={codeTheme}
            code="npm install @react-code-view/unplugin -D"
          />

          <h3>Configuration</h3>
          <CodeBlock
            title="build.js"
            language="javascript"
            theme={codeTheme}
            code={`const esbuild = require('esbuild');
const { unplugin } = require('@react-code-view/unplugin');

esbuild.build({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  outfile: 'dist/bundle.js',
  plugins: [
    unplugin.esbuild(),
  ],
  loader: {
    '.tsx': 'tsx',
    '.ts': 'ts',
  },
}).catch(() => process.exit(1));`}
          />

          <h3>Use CodeView</h3>
          <CodeBlock
            title="App.tsx"
            language="tsx"
            theme={codeTheme}
            code={`import { CodeView } from '@react-code-view/react';
import '@react-code-view/react/styles/index.css';

const snippet = ` + "`" + `const App = () => <button>Hi</button>;
render(<App />);` + "`" + `;

export default () => (
  <CodeView language="tsx" dependencies={{ React }}>
    {snippet}
  </CodeView>
);`}
          />

          <h3>Benefits</h3>
          <ul>
            <li>⚡ Lightning fast builds</li>
            <li>✅ Minimal configuration</li>
            <li>✅ Great for development</li>
          </ul>
        </Section>
      </div>
    );
  }

  return <div className="page-content"><p>Build tool not found</p></div>;
};
