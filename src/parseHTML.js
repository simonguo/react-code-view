import parseDom from './parseDom';

function text(element) {
  return element.textContent || element.innerText;
}

export default function parseHTML(source) {
  if (!source) {
    return null;
  }

  const findCode = source.match(/<!-+\ ?start-code\ ?-+>([\s\S]+)<!-+\ ?end-code\ ?-+>/gi);
  let code = null;

  if (!findCode) {
    return {
      beforeHTML: source
    };
  }

  code = text(parseDom(findCode.join('')));

  const beforeHTML = source.match(/([\s\S]+)<!-+\ ?start-code\ ?-+>/gi);
  const afterHTML = source.match(/<!-+\ ?end-code\ ?-+>([\s\S]+)/gi);

  return {
    code,
    beforeHTML,
    afterHTML
  };
}
