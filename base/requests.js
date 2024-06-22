const http = require('node:http');
let exited = false;

function sendRequest(hostname) {
  const next = () => {
    if (!exited) {
      setTimeout(() => {
        sendRequest(hostname)
      }, 3000);
    }
  }
  const postData = JSON.stringify({
    today: new Date().toISOString(),
    helloFrom: process.env.MY_NAME || 'noname'
  });

  const options = {
    hostname,
    port: 6666,
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
    },
  };

  const req = http.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (/* chunk */) => {

    });
    res.on('end', () => {
      console.log(`Request end: ${res.statusCode}`);
      next();
    });
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
    next();
  });

// Write data to request body
  req.write(postData);
  req.end();
}

module.exports = function startRequests(host) {
  console.log('Start requests to', host);
  sendRequest(host);
};
process.once('SIGTERM', () => {
  console.log('SIGTERM')
  exited = true;
})