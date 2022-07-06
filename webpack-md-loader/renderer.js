const marked = require('marked');
const hl = require('highlight.js/lib/core');
const defaultLanguages = ['javascript', 'bash', 'xml', 'css', 'markdown', 'less'];

module.exports = (languages = defaultLanguages) => {
  languages.forEach(name => {
    const langModule = require(`highlight.js/lib/languages/${name}`);
    hl.registerLanguage(name, langModule);
  });

  const renderer = new marked.Renderer();
  const codeRenderer = function (code, language) {
    const { value } = language
      ? hl.highlight(code, { language, ignoreIllegals: true })
      : hl.highlightAuto(code);

    return `
    <div class="rcv-highlight">
      <pre><code class="${language || ''}">${value}</code></pre>
    </div>
    `;
  };

  renderer.code = codeRenderer;

  return renderer;
};
