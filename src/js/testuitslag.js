'use strict';

const IRMA_SERVER = 'https://demo.irma.dev';
const IRMA_TOKEN = 'ZiHnhN0yPuop3YjQCf8BTHhekaaimy';

document.getElementById('issue').onclick = () => {
  var req = new XMLHttpRequest();
  req.open('GET', document.location, false);
  req.send(null);
  var headers = req.getAllResponseHeaders().toLowerCase();
  console.log(headers);
}
