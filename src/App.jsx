import React from 'react';
import styled from "styled-components";

import NaviBox from './components/NaviBox';
import PlayBox from './components/PlayBox';
import InfoBox from './components/InfoBox';
import ChatBox from './components/ChatBox';

import { registerOnMessageCallback } from './lib/WebSocket';
import GameState from './lib/GameState';

export default class App extends React.Component {

  constructor (props) {
    super(props)
    this.state = { playerState: {
                     name: "Observer",
                     seat: "Watching" },
                   gameState: GameState
                 };
  }

  componentDidMount () {
    registerOnMessageCallback(this.onMessageReceived.bind(this));
  }

  onMessageReceived (message) {
    message = JSON.parse(message);
    if (message.type == "action") {
      switch(message.action) {
        case "name":
          this.setState({
            playerState: {
              ...this.state.playerState,
              name: message.body
            }
          });
          break;
        case "seat":
          this.setState({
            playerState: {
              ...this.state.playerState,
              seat: message.body
            }
          });
          break;
        case "scenario":
          this.setState({
            gameState: {
              ...this.state.gameState,
              scenario: message.body
            }
          });
          break;
      }
    }
  }

  render () {
    return (
      <Layout>
        <NaviPane>
          <NaviBox playerState={this.state.playerState}
                   gameState={this.state.gameState}
          />
        </NaviPane>
        <PlayPane> <PlayBox /> </PlayPane>
        <InfoPane> <InfoBox /> </InfoPane>
        <ChatPane> <ChatBox /> </ChatPane>
      </Layout>
    );
  }
}

/* Component Style */

const Layout = styled.div`
  display: grid;
  width: 100%;
  grid-template-areas:
    "navi navi navi"
    "play play info"
    "play play chat";
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 50px 1fr;
`;

const NaviPane = styled.div`
  grid-area: navi;
  border-bottom: 1px solid white;
`;

const PlayPane = styled.div`
  grid-area: play;
  border-right: 1px solid white;
`;

const InfoPane = styled.div`
  grid-area: info;
`;

const ChatPane = styled.div`
  grid-area: chat;
`;
