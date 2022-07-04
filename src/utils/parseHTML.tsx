import parseDom from './parseDom';

function text(element) {
  return element.textContent || element.innerText;
}

export default function parseHTML(source: string) {
  if (!source) {
    return null;
  }

  const exampleCode = source.match(/<!-+\ ?start-code\ ?-+>([\s\S]+)<!-+\ ?end-code\ ?-+>/gi);

  if (!exampleCode) {
    return {
      beforeHTML: source
    };
  }

  const code = text(parseDom(exampleCode.join('').replace(/\n+/, '')));
  const beforeHTML = source.match(/([\s\S]+)<!-+\ ?start-code\ ?-+>/gi)?.join('');
  const afterHTML = source.match(/<!-+\ ?end-code\ ?-+>([\s\S]+)/gi)?.join('');

  return {
    code,
    beforeHTML,
    afterHTML
  };
}
