import { MessageTemplate } from 'shared/Message.mjs';

let send
let onMessageCallbacks = [ ];

export const startWebsocketConnection = () => {
  var serverUrl;
  var scheme = 'ws';
  var location = document.location;

  if (location.protocol === 'https:') {
    scheme += 's'; //wss:
  }

  serverUrl = `${scheme}://${location.hostname}:${location.port}/chat`;

  const ws = new window.WebSocket(serverUrl) || {}

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

export const wsSendMessage = (from, text) => {
  const regexpMessage = /\/([a-z]+) (.*)/i;
  const msgMatch = text.match(regexpMessage);

  let message = MessageTemplate;

  message.from = from;
  message.kind = "message";
  message.body = text;

  if (msgMatch) {
    message.kind = "action";
    message.head = msgMatch[1].toLowerCase();
    message.body = msgMatch[2];
  }

  send(JSON.stringify(message));
}

export const registerOnMessageCallback = (fn) => {
  onMessageCallbacks.push(fn);
}
