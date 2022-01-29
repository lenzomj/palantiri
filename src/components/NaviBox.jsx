import React, { Component } from 'react';
import styled from "styled-components";

import Console from './Console';
import { wsSendMessage } from '../lib/WebSocket';

export default class NaviBox extends Component {

  constructor (props) {
    super(props)
  }

  sendMessage (text) {
    wsSendMessage(this.props.playerID, text);
  }

  render () {
    const sendMessage = this.sendMessage.bind(this);

    let player = "Observer";
    if (this.props.gameState.players.has(this.props.playerID)) {
      console.log(this.props.gameState.players.get(this.props.playerID));
      player = this.props.gameState.players.get(this.props.playerID);
    }

    return (
      <Layout>
        <FirstItem><p>Palantir</p></FirstItem>
        <Item><p>Players: {this.props.gameState.players.size}</p></Item>
        <Item><p>{player}</p></Item>
        <Item><p>Scenario: {this.props.gameState.scenario}</p></Item>
        <LastItem><Console onSend={sendMessage} /> </LastItem>
      </Layout>
    );
  }
}

/* Component Style */

const Layout = styled.div`
  display: flex;
`;

const FirstItem = styled.div`
  color: white;
  font-weight: bold;
  border-right: 1px solid white;
  padding-right: 1rem;
  text-align: center;
`;

const Item = styled.div`
  color: white;
  border-right: 1px solid white;
  padding-right: 1rem;
  padding-left: 1rem;
  text-align: center;
`;

const LastItem = styled.div`
  color: white;
  padding-left: 1rem;
  text-align: center;
`;
