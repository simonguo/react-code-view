/* eslint-disable @typescript-eslint/no-var-requires */
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

    return `<div class="rcv-highlight">
          <button type="button" class="copy-code-button rs-btn-icon rs-btn-icon-circle rs-btn rs-btn-subtle rs-btn-xs" title="Copy code" aria-label="Copy code" >
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
             <path class="copy-icon-path" d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"></path>
            </svg>
          </button>
          <input type="hidden" class="copy-code-input" value="${code}" />
          <pre><code class="${language || ''}">${value}</code></pre>
        </div>`;
  };

  renderer.code = codeRenderer;

  return renderer;
};
