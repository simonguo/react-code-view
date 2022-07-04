const marked = require('marked');
const hl = require('highlight.js/lib/core');
const defalutLanguages = ['javascript', 'bash', 'xml', 'css', 'markdown', 'less'];

module.exports = (languages = defalutLanguages) => {
  languages.forEach(langName => {
    const langModule = require(`highlight.js/lib/languages/${langName}`);
    hl.registerLanguage(langName, langModule);
  });

  const renderer = new marked.Renderer();
  const codeRenderer = function (code, lang) {
    lang = lang === 'js' ? 'javascript' : lang;
    if (lang === 'html') {
      lang = 'xml';
    }

    const hlCode = lang ? hl.highlight(lang, code).value : hl.highlightAuto(code).value;
    return `<div class="doc-highlight"><pre><code class="${
      lang || ''
    }">${hlCode}</code></pre></div>`;
  };

  renderer.code = codeRenderer;

  return renderer;
};
