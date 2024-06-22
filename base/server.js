const http = require('http');

module.exports = function startServer() {
  const server = http.createServer();
  server.on('request', (request, response) => {
    let body = [];
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      console.log('Received', JSON.parse(body));
      response.end();
    });
  }).listen(6666);
  process.once('SIGTERM', () => {
    console.log('SIGTERM')
    server.close();
  })
}