// src/MessageWindow.jsx

import React from 'react'
import './MessageWindow.css'

// The message component takes the message text and the username of the message
// sender. It also takes `self` - a boolean value depicting whether the message
// is sent by the current logged in user
const Message = ({ text, playerID, playerName, self }) => (
  <div className={'message' + (self ? ' message-self' : '')}>
    <div className='message-username'>{playerName}</div>
    <div className='message-text'>{text}</div>
  </div>
)

// The message window contains all the messages
export default class MessageWindow extends React.Component {
  constructor (props) {
    super(props)
    // The `messageWindow` ref is used for autoscrolling the window
    this.messageWindow = React.createRef()
  }
  componentDidUpdate () {
    // Everytime the component updates (when a new message is sent) we
    // change the `scrollTop` attribute to autoscroll the message window
    // to the bottom
    const messageWindow = this.messageWindow.current
    messageWindow.scrollTop = messageWindow.scrollHeight - messageWindow.clientHeight
  }
  render () {
    const { messages = [], playerID, playerName } = this.props
    // The message window is a container for the list of messages, which
    // as mapped to `Message` components
    return (
      <div className='message-window' ref={this.messageWindow}>
        {messages.map((msg, i) => {
          return <Message key={i} text={msg.body} playerID={msg.from} playerName={playerName} self={playerID === msg.from} />
        })}
      </div>
    )
  }
}
