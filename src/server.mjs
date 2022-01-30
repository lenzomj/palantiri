import Express from 'express';
import expressWs from 'express-ws';
import { v4 as uuidv4 } from 'uuid';

import Game from './lib/Game.mjs';
import { MessageTemplate } from './lib/WebSocket.mjs';

import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const loadCardLibrary = (filePath) => {
  let cardLibrary;
  let jsonLibrary = fs.readFileSync(filePath);
  return JSON.parse(jsonLibrary);
}

const libraryPath = path.join(__dirname, '/data/cards.json');


const WSPORT = 8080;
const app = new Express();

const clients = new Set();
const game = new Game(loadCardLibrary(libraryPath));

/*
 * Define a WebSocket handler and add it to the /chat route.
 */
const wsHandler = (ws) => {
  let clientID = uuidv4();

  clients.add(ws);
  wsSendPlayerID(ws, clientID);
  wsSendGameState(ws);
  console.log(`${clientID} has connected to the server`);

  ws.on('message', (jsonMessage) => {
    let call = JSON.parse(jsonMessage);
    let stateChanged = false;

    if (call.kind == "action") {
      switch(call.head) {
        case "scenario":
          game.select(call.body);
          stateChanged = true;
          break;
        case "join":
          game.join(clientID, call.body);
          stateChanged = true;
          break;
        case "reveal":
          game.reveal(call.body);
          stateChanged = true;
          break;
        case "quest":
          game.quest(call.body);
          stateChanged = true;
      }
      if (stateChanged) {
        wsBroadcastGameState();
      }
    } else { // normal message
      wsBroadcast(jsonMessage);
    }
  });

  ws.on('close', () => {
    game.leave(clientID);
    console.log(`${clientID} has disconnected from the server`);
    clients.delete(ws);
  });
};

const wsSendGameState = (ws) => {
    let msg = MessageTemplate;
    msg.from = "gamemaster";
    msg.kind = "action";
    msg.head = "state";
    msg.body = game.getStateAsJSON();
    ws.send(JSON.stringify(msg));
    //wsBroadcast(JSON.stringify(msg));
}


const wsSendPlayerID = (ws, playerID) => {
    let msg = MessageTemplate;
    msg.from = "gamemaster";
    msg.kind = "action";
    msg.head = "playerid";
    msg.body = playerID;
    ws.send(JSON.stringify(msg));
}

const wsBroadcastGameState = () => {
  clients.forEach((client) => wsSendGameState(client));
}

const wsBroadcast = (jsonMessage) => {
  clients.forEach((client) => client.send(jsonMessage));
}

expressWs(app);
app.ws('/chat', wsHandler);

/*
 * Start the server.
 */
app.listen(WSPORT);
console.log(`Listening on port ${WSPORT}`);
