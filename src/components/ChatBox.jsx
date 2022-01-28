import React from 'react';
import './ChatBox.css';

import MessageWindow from './MessageWindow';
import TextBar from './TextBar';

import { registerOnMessageCallback } from '../lib/WebSocket';

export class ChatBox extends React.Component {
  // The messages and username are used as the application state
  state = {
    messages: [],
    username: null
  }

  constructor (props) {
    super(props)
    // The onMessageReceived method is registered as the callback
    // with the imported `registerOnMessageCallback`
    // Everytime a new message is received, `onMessageReceived` will
    // get called
  }

  componentDidMount () {
    registerOnMessageCallback(this.onMessageReceived.bind(this))
  }

  onMessageReceived (msg) {
    // Once we receive a message, we will parse the message payload
    // Add it to our existing list of messages, and set the state
    // with the new list of messages
    msg = JSON.parse(msg)
    this.setState({
      messages: this.state.messages.concat(msg)
    })
  }

  // This is a helper method used to set the username
  setUserName (name) {
    this.setState({
      username: name
    })
  }

  render () {
    // Create functions by binding the methods to the instance
    const setUserName = this.setUserName.bind(this)

    // If the username isn't set yet, we display just the textbar
    // along with a hint to set your username. Once the text is entered
    // the `setUsername` method adds the username to the state
    /*if (this.state.username === null) {
      return (
        <div className='container'>
          <div className='container-title'>Enter username</div>
          <TextBar onSend={setUserName} />
        </div>
      )
    }*/

    // If the username is already set, we display the message window with
    // the text bar under it. The `messages` prop is set as the states current list of messages
    // the `username` prop is set as the states current username
    // The `onSend` prop of the TextBar is bound to the `sendMessage` method
    return (
      <div className='container'>
        <div className='container-title'>Messages</div>
        <MessageWindow messages={this.state.messages} username={this.state.username} />
      </div>
    )
  }
}

export default ChatBox
