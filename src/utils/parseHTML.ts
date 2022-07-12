import parseDom from './parseDom';

function text(element) {
  return element.textContent || element.innerText;
}

export default function parseHTML(source: string) {
  if (!source) {
    return null;
  }

  const fragments = source.split(/(<!-+\ ?start-code\ ?-+>[\s\S]+?<!-+\ ?end-code\ ?-+>)/gi);

  return fragments.map((fragment, key) => {
    if (fragment.match(/<!-+\ ?start-code\ ?-+>[\s\S]+?<!-+\ ?end-code\ ?-+>/gi)) {
      return { key, type: 'code', content: text(parseDom(fragment)) };
    }

    return { key, type: 'html', content: fragment };
  });
}
