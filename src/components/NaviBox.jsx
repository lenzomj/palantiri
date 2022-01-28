import React, { Component } from 'react';
import styled from "styled-components";

import Console from './Console';
import { wsSendMessage } from '../lib/WebSocket';

export default class NaviBox extends Component {

  constructor (props) {
    super(props)
  }

  sendMessage (text) {
    /*const message = {
      source: this.props.playerState.name,
      message: text
    };*/
    wsSendMessage(this.props.playerState.name, text);
  }

  render () {
    const sendMessage= this.sendMessage.bind(this);

    return (
      <Layout>
        <FirstItem><p>Palantir</p></FirstItem>
        <Item><p>Name: {this.props.playerState.name}</p></Item>
        <Item><p>Seat: {this.props.playerState.seat}</p></Item>
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



