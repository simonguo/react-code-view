import $ from 'jquery';

export default function splitDocs(html) {

  const $dom = $(`<div>${html}</div>`);
  const $code = $dom.find('code.javascript');
  $dom.find('.doc-highlight').remove();

  return {
    code: $code.text(),
    text: $dom.prop('outerHTML')
  };
}
