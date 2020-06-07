const http = require('http');

const server = http.createServer((req, res) => {
  if(req.url === '/'){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<p style=\'background-color: black; color: white;\'>Hola desde NodeJS</p>');
    res.end();
  }
  else if(req.url === '/coches'){
    res.write('coche1');
    res.write('fin de lista de coches...');
    res.end();
  }
  else {
    res.statusCode = 404;
    res.write('recurso no o encontrado');
    res.end();
  }
});

server.on('connection', (socket) => {
  console.log('nueva conexión detectada');
});

server.listen(50515);
console.log('Escuchando en el puerto 50515');