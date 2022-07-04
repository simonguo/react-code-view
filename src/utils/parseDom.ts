export default function parseDom(arg: string) {
  var objE = document.createElement('div');
  objE.innerHTML = arg;
  return objE;
}
