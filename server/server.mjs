import Express from 'express';
import expressWs from 'express-ws';
import { v4 as uuidv4 } from 'uuid';

import { loadLibraryFromFile } from 'shared/library_loader.mjs';
import Game from 'shared/game.mjs';
import { MessageTemplate } from 'shared/Message.mjs';

import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const libraryPath = path.join(__dirname, '../shared/data/cards.json');

const WSPORT = process.env.PORT || 5000;
const app = new Express();

const clients = new Set();
const game = new Game(loadLibraryFromFile(libraryPath));
game.default();

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
        case "join":
          game.join(clientID, call.body);
          stateChanged = true;
          break;
        case "scenario":
          game.select(call.body);
          stateChanged = true;
          break;
        case "quest":
          game.quest(call.body);
          stateChanged = true;
          break;
        case "reveal":
          game.reveal(call.body);
          stateChanged = true;
          break;
        case "discard":
          game.discard(call.body);
          stateChanged = true;
          break;
        case "engage":
          game.engage(call.body);
          stateChanged = true;
          break;
        case "travel":
          game.travel(call.body);
          stateChanged = true;
          break;
        case "explore":
          game.explore();
          stateChanged = true;
          break;
        case "defeat":
          game.defeat(call.body);
          stateChanged = true;
          break;
        case "return":
          game.return(call.body);
          stateChanged = true;
          break;
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
    msg.body = game.exportState();
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
app.use(Express.static(path.resolve(__dirname, '../client/build')));
console.log(`Listening on port ${WSPORT}`);
