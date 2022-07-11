export default function parseDom(arg: string) {
  const objE = document.createElement('div');
  objE.innerHTML = arg;
  return objE;
}
