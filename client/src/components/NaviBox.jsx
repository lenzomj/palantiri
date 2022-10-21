import React, { Component } from 'react';
import styled from "styled-components";

import Console from './Console';
import { wsSendMessage } from '../lib/WebSocket';

import { GameContext } from './GameContext';

export default class NaviBox extends Component {

  constructor (props) {
    super(props)
  }

  sendMessage (text) {
    wsSendMessage(this.context.playerID, text);
  }

  render () {
    const sendMessage = this.sendMessage.bind(this);

    return (
      <Layout>
        <FirstItem><p>Palantir v0.3.1</p></FirstItem>
        <Item><p>Players: {this.context.gameState.players.size || 0}</p></Item>
        <Item><p>{this.context.playerName}</p></Item>
        <Item><p>Scenario: {this.context.gameState.scenario ?? "Not Selected"}</p></Item>
        <LastItem><Console onSend={sendMessage} /> </LastItem>
      </Layout>
    );
  }
}

NaviBox.contextType = GameContext;

/* Component Style */

const Layout = styled.div`
  display: flex;
`;

const FirstItem = styled.div`
  color: white;
  font-weight: bold;
  border-right: 1px solid rgba(255,255,255,0.4);
  padding-right: 1rem;
  text-align: center;
`;

const Item = styled.div`
  color: white;
  border-right: 1px solid rgba(255,255,255,0.4);
  padding-right: 1rem;
  padding-left: 1rem;
  text-align: center;
`;

const LastItem = styled.div`
  color: white;
  padding-left: 1rem;
  text-align: center;
`;
