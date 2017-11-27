import $ from 'jquery';

export default function parseHTML(source) {

  const $dom = $(`<div>${source}</div>`);
  const html = $dom.html();

  const $code = $(`<div>${html.match(/<!--start-code-->([\s\S]+)<!--end-code-->/ig)}</div>`);

  const beforeHTML = html.match(/([\s\S]+)<!--start-code-->/ig);
  const afterHTML = html.match(/<!--end-code-->([\s\S]+)/ig);

  return {
    code: $code.text(),
    beforeHTML,
    afterHTML
  };
}
