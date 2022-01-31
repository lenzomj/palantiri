import React, { Component } from 'react';
import styled from "styled-components";

import MessageWindow from './MessageWindow';

import { registerOnMessageCallback } from '../lib/WebSocket';

export default class ChatBox extends Component {
  state = {
    messages: [],
  }

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    registerOnMessageCallback(this.onMessageReceived.bind(this));
  }

  onMessageReceived (msg) {
    msg = JSON.parse(msg);
    if ( msg.kind != "action") {
      this.setState({
        messages: this.state.messages.concat(msg),
      });
    }
  }

  render () {
    return (
      <Layout>
        <MessageWindow messages={this.state.messages}
                       playerID={this.props.appState.playerID}
                       playerName={this.props.appState.playerName} />
      </Layout>
    );
  }
}

const Layout = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: auto;
`;
