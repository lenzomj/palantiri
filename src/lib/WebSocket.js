// src/websocket.js

// The server host is determined based on the mode
// If the app is running in development mode (using npm start)
// then we set the host to "localhost:8080"
// If the app is in production mode (using npm run build)
// then the host is the current browser host
const host = process.env.NODE_ENV === 'production' ? window.location.host : 'localhost:8080'

let send
let onMessageCallbacks = [ ];

export const startWebsocketConnection = () => {
  const ws = new window.WebSocket('ws://' + host + '/chat') || {}

  ws.onopen = () => {
    console.log('opened ws connection')
  }

  ws.onclose = (e) => {
    console.log('close ws connection: ', e.code, e.reason)
  }

  ws.onmessage = (e) => {
    onMessageCallbacks.forEach(callback => callback && callback(e.data))
  }

  send = ws.send.bind(ws)
}

export const wsSendMessage = (source, text) => {
  const regexpMessage = /\/([a-z]+) (.*)/i;
  const msgMatch = text.match(regexpMessage);

  let msgType = "message";
  let msgAction = undefined;
  let msgBody = text;

  if (msgMatch) {
    msgType = "action";
    msgAction = msgMatch[1].toLowerCase();
    msgBody = msgMatch[2];
  }

  const message = {
    source:  source,
    type:    msgType,
    action:  msgAction,
    body:    msgBody
  };
  send(JSON.stringify(message));
}

export const registerOnMessageCallback = (fn) => {
  onMessageCallbacks.push(fn);
}