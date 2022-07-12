import parseHTML from '../src/utils/parseHTML';

const trim = str => {
  return str.replace(/[\n]+/g, '').trim();
};

it('parse be null', () => {
  const result = parseHTML('');

  expect(result).toBe(null);
});

it('parse be html', () => {
  const result = parseHTML('<html><div></div></html>');

  expect(result.length).toBe(1);
  expect(result[0].type).toBe('html');
  expect(result[0].content).toBe('<html><div></div></html>');
});

it('Parse into one piece of code and two pieces of html', () => {
  const html = `<h1>header</h1>
        <!--start-code-->
        const a = 100;
        <!--end-code-->
        <p>footer</p>`;

  const result = parseHTML(html);

  expect(result.length).toBe(3);
  expect(result[0].type).toBe('html');
  expect(result[1].type).toBe('code');
  expect(result[2].type).toBe('html');
  expect(trim(result[0].content)).toContain('<h1>header</h1>');
  expect(trim(result[1].content)).toContain('const a = 100;');
  expect(trim(result[2].content)).toContain('<p>footer</p>');
});

it('Parse into  two pieces of code and three pieces of html', () => {
  const html = `<h1>header</h1>
          <!--start-code-->
          const a = 100;
          <!--end-code-->
          <h2>title</h2>
          <!--start-code-->
          const b = 200;
          <!--end-code-->
          <p>footer</p>`;

  const result = parseHTML(html);

  expect(result.length).toBe(5);
  expect(result[0].type).toBe('html');
  expect(result[1].type).toBe('code');
  expect(result[2].type).toBe('html');
  expect(result[3].type).toBe('code');
  expect(result[4].type).toBe('html');

  expect(trim(result[0].content)).toBe('<h1>header</h1>');
  expect(trim(result[1].content)).toBe('const a = 100;');
  expect(trim(result[2].content)).toBe('<h2>title</h2>');
  expect(trim(result[3].content)).toBe('const b = 200;');
  expect(trim(result[4].content)).toBe('<p>footer</p>');
});
