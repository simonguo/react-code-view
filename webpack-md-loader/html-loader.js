/**
 * modified version of:
 * https://github.com/webpack-contrib/html-loader/blob/v3.1.2/src/index.js
 */

const { sourcesPlugin } = require('html-loader/dist/plugins');
const utils = require('html-loader/dist/utils');

async function loader(content, htmlOptions) {
  const options = utils.normalizeOptions(htmlOptions || {}, this);

  if (options.preprocessor) {
    content = await options.preprocessor(content, this);
  }

  const plugins = [];
  const errors = [];
  const imports = [];
  const replacements = [];

  if (options.sources) {
    plugins.push(
      sourcesPlugin({
        sources: options.sources,
        resourcePath: this.resourcePath,
        context: this.context,
        imports,
        errors,
        replacements
      })
    );
  }

  const { html } = await utils.pluginRunner(plugins).process(content);

  for (const error of errors) {
    this.emitError(error instanceof Error ? error : new Error(error));
  }

  const importCode = utils.getImportCode(html, this, imports, options);
  const moduleCode = utils.getModuleCode(html, replacements, options);
  const exportCode = utils.getExportCode(html, options);
  return `${importCode}${moduleCode}${exportCode}`;
}

module.exports = loader;
