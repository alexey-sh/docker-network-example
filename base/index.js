const startServer = require('./server');
const startRequests = require('./requests');
startServer()
startRequests(process.env.SEND_TO_HOST);