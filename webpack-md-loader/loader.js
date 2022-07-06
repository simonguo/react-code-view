'use strict';

const parse = require('marked').parse;
const htmlLoader = require('./html-loader');
const renderer = require('./renderer');

var _options = require('./options.json');

const defaultParseLanguages = ['javascript', 'bash', 'xml', 'css', 'markdown', 'less'];

async function loader(source) {
  const {
    parseLanguages = defaultParseLanguages,
    htmlOptions,
    markedOptions
  } = this.getOptions(_options);

  const code = parse.call(this, source, {
    renderer: renderer(parseLanguages),
    ...markedOptions
  });

  return await htmlLoader.call(this, code, htmlOptions);
}

module.exports = loader;
