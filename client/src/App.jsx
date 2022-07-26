import React from "react";
import styled from "styled-components";

import NaviBox from "./components/NaviBox";
import PlayBox from "./components/PlayBox";
import InfoBox from "./components/InfoBox";
import ChatBox from "./components/ChatBox";

import { registerOnMessageCallback, wsSendMessage } from "./lib/WebSocket";
import { GameState } from "shared/game";

const keepAlive = (playerID, interval) => {
  wsSendMessage(playerID, "/ping keepalive");
  setTimeout(() => {
    keepAlive(playerID, interval);
  }, interval);
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerID: undefined,
      playerName: "Observer",
      playerView: undefined,
      gameState: new GameState(),
    };
  }

  componentDidMount() {
    registerOnMessageCallback(this.onMessageReceived.bind(this));
  }

  onCardSelected(event) {
    this.setState({
      playerView: event.target.src,
    });
  }

  onMessageReceived(message) {
    message = JSON.parse(message);
    if (message.kind == "action") {
      switch (message.head) {
        case "playerid":
          console.log(`Received playerid ${message.body}`);
          this.setState({
            playerID: message.body,
          });
          keepAlive(this.state.playerID, 30000);
          break;
        case "state":
          let newState = JSON.parse(message.body, GameState.Reviver);
          let playerName =
            newState.players.get(this.state.playerID) || "Observer";
          this.setState({
            playerName: playerName,
            gameState: newState,
          });
          break;
      }
    }
  }

  render() {
    const onCardSelected = this.onCardSelected.bind(this);

    return (
      <Layout>
        <NaviPane>
          <NaviBox appState={this.state} />
        </NaviPane>
        <PlayPane>
          <PlayBox appState={this.state} onCardSelected={onCardSelected} />
        </PlayPane>
        <InfoPane>
          <InfoBox appState={this.state} />
        </InfoPane>
        <ChatPane>
          <ChatBox appState={this.state} />
        </ChatPane>
      </Layout>
    );
  }
}

/* Component Style */

const Layout = styled.div`
  display: grid;
  grid-template-areas:
    "navi navi navi"
    "play play info"
    "play play chat";
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 50px 1fr;
  height: 100vh;
  width: 100vw;
`;

const NaviPane = styled.div`
  grid-area: navi;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
`;

const PlayPane = styled.div`
  grid-area: play;
  border-right: 1px solid rgba(255, 255, 255, 0.4);
`;

const InfoPane = styled.div`
  grid-area: info;
`;

const ChatPane = styled.div`
  grid-area: chat;
`;
