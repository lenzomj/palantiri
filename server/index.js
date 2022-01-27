// server/index.js

/*
 * Enable express style routes for WebSocket endpoints.
 */
const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);

const WSPORT = 8080;
const clients = new Set();

/*
 * Define a WebSocket handler and add it to the /chat route.
 */
const wsHandler = (ws) => {
  clients.add(ws);

  ws.on('message', (message) => {
     clients.forEach((client) => client.send(message));
  });

  ws.on('close', () => {
    clients.delete(ws);
  });
};

app.ws('/chat', wsHandler);

/*
 * Start the server.
 */
app.use(express.static('build'));
app.listen(WSPORT);
console.log(`Listening on port ${WSPORT}`);
