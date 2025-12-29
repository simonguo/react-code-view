import React from 'react';
import { useParams } from 'react-router-dom';
import { Section } from '../components/Section';
import { CodeBlock } from '../components/CodeBlock';

interface ComponentsPageProps {
  theme: string;
}

export const ComponentsPage: React.FC<ComponentsPageProps> = ({ theme }) => {
  const { component } = useParams<{ component: string }>();
  const isDark = theme === 'rcv-theme-dark';
  const codeTheme = isDark ? 'github-dark' : 'github-light';

  if (component === 'code-view') {
    return (
      <div className="page-content">
        <Section id="code-view" title="CodeView">
          <p className="section-intro">
            CodeView is the primary component for delivering live, editable React code examples. It combines an editor, live preview, and syntax highlighting.
          </p>

          <h3>Minimal Example</h3>
          <CodeBlock
            language="tsx"
            theme={codeTheme}
            code={`import { CodeView } from '@react-code-view/react';

const code = ` + "`" + `const Hello = () => <h1>Hello World</h1>;
render(<Hello />);` + "`" + `;

export function Demo() {
  return (
    <CodeView language="tsx" theme="rcv-theme-default">
      {code}
    </CodeView>
  );
}`}
          />

          <h3>With Dependencies (React Hooks)</h3>
          <CodeBlock
            language="tsx"
            theme={codeTheme}
            code={`import { CodeView } from '@react-code-view/react';
import React from 'react';

const code = ` + "`" + `const Counter = () => {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
render(<Counter />);` + "`" + `;

export function Demo() {
  return (
    <CodeView 
      language="tsx" 
      theme="rcv-theme-default"
      dependencies={{ React }}
    >
      {code}
    </CodeView>
  );
}`}
          />

          <h3>Props</h3>
          <div className="api-table-wrapper">
            <table className="api-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>children</code></td>
                  <td><code>string</code></td>
                  <td>-</td>
                  <td>Source code to display and execute</td>
                </tr>
                <tr>
                  <td><code>language</code></td>
                  <td><code>string</code></td>
                  <td><code>'jsx'</code></td>
                  <td>Language for syntax highlighting</td>
                </tr>
                <tr>
                  <td><code>dependencies</code></td>
                  <td><code>Record&lt;string, unknown&gt;</code></td>
                  <td><code>{'{}'}</code></td>
                  <td>Injected globals for execution (e.g., <code>useState</code>, <code>fetch</code>)</td>
                </tr>
                <tr>
                  <td><code>theme</code></td>
                  <td><code>string</code></td>
                  <td><code>'rcv-theme-default'</code></td>
                  <td>Theme name for syntax highlighting</td>
                </tr>
                <tr>
                  <td><code>renderPreview</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Show live preview panel</td>
                </tr>
                <tr>
                  <td><code>editable</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Allow code editing</td>
                </tr>
                <tr>
                  <td><code>showCopyButton</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Show copy code button</td>
                </tr>
                <tr>
                  <td><code>onError</code></td>
                  <td><code>(error: Error) =&gt; void</code></td>
                  <td>-</td>
                  <td>Error callback when code execution fails</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Features</h3>
          <ul>
            <li>✅ Live code editing with CodeMirror 6</li>
            <li>✅ Real-time preview rendering</li>
            <li>✅ Syntax highlighting with Shiki</li>
            <li>✅ Error boundary for safe execution</li>
            <li>✅ Copy code button</li>
            <li>✅ Dark mode support</li>
            <li>✅ Supports 100+ languages</li>
          </ul>
        </Section>
      </div>
    );
  }

  if (component === 'code-editor') {
    return (
      <div className="page-content">
        <Section id="code-editor" title="CodeView (with CodeEditor inside)">
          <p className="section-intro">
            CodeView is the primary way to deliver live, editable React examples. It wraps CodeEditor + Preview + Renderer.
          </p>

          <h3>Minimal CodeView</h3>
          <CodeBlock
            language="tsx"
            theme={codeTheme}
            code={`import { CodeView } from '@react-code-view/react';

const snippet = ` + "`" + `const App = () => <button>Click</button>;
render(<App />);` + "`" + `;

export function Demo() {
  return (
    <CodeView
      language="tsx"
      theme="rcv-theme-default"
      dependencies={{}}
    >
      {snippet}
    </CodeView>
  );
}`}
          />

          <h3>Props (most used)</h3>
          <div className="api-table-wrapper">
            <table className="api-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>children</code></td>
                  <td><code>string</code></td>
                  <td>-</td>
                  <td>Source to render & highlight</td>
                </tr>
                <tr>
                  <td><code>language</code></td>
                  <td><code>string</code></td>
                  <td><code>'jsx'</code></td>
                  <td>Highlighting language</td>
                </tr>
                <tr>
                  <td><code>dependencies</code></td>
                  <td><code>Record&lt;string, unknown&gt;</code></td>
                  <td><code>{'{}'}</code></td>
                  <td>Injected globals for execution (e.g., <code>useState</code>)</td>
                </tr>
                <tr>
                  <td><code>renderPreview</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Render the live preview panel</td>
                </tr>
                <tr>
                  <td><code>showCopyButton</code></td>
                  <td><code>boolean</code></td>
                  <td><code>true</code></td>
                  <td>Show copy-to-clipboard in toolbar</td>
                </tr>
                <tr>
                  <td><code>theme</code></td>
                  <td><code>string</code></td>
                  <td><code>'rcv-theme-default'</code></td>
                  <td>Applies to toolbar + code highlighting</td>
                </tr>
                <tr>
                  <td><code>beforeCompile</code> / <code>afterCompile</code></td>
                  <td><code>(code: string) =&gt; string</code></td>
                  <td>-</td>
                  <td>Hooks to mutate code pre/post transform</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Patterns</h3>
          <CodeBlock
            title="Provide React hooks"
            language="tsx"
            theme={codeTheme}
            code={`<CodeView
  language="tsx"
  dependencies={{ useState: React.useState }}
>
  {` + "`" + `const App = () => {
    const [open, setOpen] = useState(false);
    return <button onClick={() => setOpen(o => !o)}>Toggle {String(open)}</button>;
  };
  render(<App />);` + "`" + `}
</CodeView>`}
          />

          <CodeBlock
            title="Read-only mode"
            language="tsx"
            theme={codeTheme}
            code={`<CodeView
  language="tsx"
  renderPreview={false}
  editable={false}
>
  {` + "`" + `const a = 1;` + "`" + `}
</CodeView>`}
          />

          <CodeBlock
            title="Dark theme"
            language="tsx"
            theme={codeTheme}
            code={`<CodeView theme="rcv-theme-dark" language="tsx">{code}</CodeView>`}
          />
        </Section>
      </div>
    );
  }

  if (component === 'renderer') {
    return (
      <div className="page-content">
        <Section id="renderer" title="Renderer (used inside CodeView)">
          <p className="section-intro">
            Renderer is used by CodeView for read-only display; you can also use it standalone for static docs.
          </p>

          <h3>Standalone</h3>
          <CodeBlock
            language="tsx"
            theme={codeTheme}
            code={`import { Renderer } from '@react-code-view/react';

export function StaticBlock() {
  const code = ` + "`" + `const greeting = "Hello";` + "`" + `;
  return <Renderer code={code} language="javascript" theme="github-light" />;
}`}
          />

          <h3>Inside CodeView (default)</h3>
          <CodeBlock
            language="tsx"
            theme={codeTheme}
            code={`<CodeView theme="rcv-theme-default" language="tsx">{code}</CodeView>
<!-- Renderer is used under the hood when you click “Show Code” in read-only mode -->`}
          />

          <h3>Themes</h3>
          <p>Pass any Shiki theme name (e.g., github-light, github-dark, one-dark-pro).</p>
        </Section>
      </div>
    );
  }

  if (component === 'markdown-renderer') {
    return (
      <div className="page-content">
        <Section id="markdown-renderer" title="MarkdownRenderer">
          <p className="section-intro">
            Renders Markdown content with automatic syntax highlighting for code blocks.
          </p>

          <h3>Basic Usage</h3>
          <CodeBlock
            language="tsx"
            theme={codeTheme}
            code={`import { MarkdownRenderer } from '@react-code-view/react';

const markdown = \`
# My Documentation

Here's some code:

\\\`\\\`\\\`javascript
const x = 10;
console.log(x);
\\\`\\\`\\\`
\`;

function Docs() {
  return <MarkdownRenderer theme="github-light">{markdown}</MarkdownRenderer>;
}`}
          />

          <h3>Props</h3>
          <div className="api-table-wrapper">
            <table className="api-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>children</code></td>
                  <td><code>string</code></td>
                  <td>-</td>
                  <td>Markdown content</td>
                </tr>
                <tr>
                  <td><code>theme</code></td>
                  <td><code>string</code></td>
                  <td><code>'github-light'</code></td>
                  <td>Theme for code blocks</td>
                </tr>
                <tr>
                  <td><code>className</code></td>
                  <td><code>string</code></td>
                  <td>-</td>
                  <td>Custom CSS class</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Features</h3>
          <ul>
            <li>✅ Automatic syntax highlighting for code blocks</li>
            <li>✅ Supports all Markdown syntax</li>
            <li>✅ Detects language from code fence</li>
            <li>✅ Theme switching support</li>
          </ul>
          </Section>
        </div>
      );
    }
    if (component === 'markdown-renderer') {
      return (
        <div className="page-content">
          <Section id="markdown-renderer" title="MarkdownRenderer (great for docs)">
            <p className="section-intro">
              Pair MarkdownRenderer with CodeView blocks to document live React snippets and static fences together.
            </p>

            <h3>Docs page example</h3>
            <CodeBlock
              language="tsx"
              theme={codeTheme}
              code={`import { MarkdownRenderer, CodeView } from '@react-code-view/react';

  const markdown = \`# API

  Here is a live example:

  <CodeView language="tsx" dependencies={{ useState }}>
  {` + "`" + `const App = () => {
    const [open, setOpen] = useState(false);
    return <button onClick={() => setOpen(o => !o)}>Open: {String(open)}</button>;
  };
  render(<App />);` + "`" + `}
  </CodeView>
  ` + "`" + `;

  export function Docs() {
    return <MarkdownRenderer theme="github-light">{markdown}</MarkdownRenderer>;
  }`}
            />

            <h3>Notes</h3>
            <ul>
              <li>Inline CodeView blocks render live; fenced code uses Shiki themes.</li>
              <li>Pass any Shiki theme; match it with your site theme toggle.</li>
            </ul>
          </Section>
        </div>
      );
    }

  return <div className="page-content"><p>Component not found</p></div>;
};
