import React from 'react';
import './ChatBox.css';

import MessageWindow from './MessageWindow';
import TextBar from './TextBar';

import { registerOnMessageCallback } from '../lib/WebSocket';

export default class ChatBox extends React.Component {
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
    msg = JSON.parse(msg)
    if ( msg.kind != "action") {
      this.setState({
        messages: this.state.messages.concat(msg)
      });
    }
  }

  render () {
    return (
      <div className='container'>
        <div className='container-title'>Messages</div>
        <MessageWindow messages={this.state.messages} username={this.props.playerID} />
      </div>
    );
  }
}
