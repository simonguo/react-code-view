export default function parseDom(arg) {
  var objE = document.createElement('div');
  objE.innerHTML = arg;
  return objE;
}
