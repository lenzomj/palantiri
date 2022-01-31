import React, { Component } from 'react'
import styled from "styled-components";

export default class Console extends Component {
  constructor (props) {
    super(props);
    this.input = React.createRef();
  }

  sendMessageIfEnter (e) {
    if (e.keyCode === 13) {
      this.props.onSend && this.props.onSend(this.input.current.value);
      this.input.current.value = '';
    }
  }

  render () {
    const sendMessageIfEnter = this.sendMessageIfEnter.bind(this)

    return (
      <Layout>
        <p>Console: </p>
        <Input type='text' ref={this.input} onKeyDown={sendMessageIfEnter} />
      </Layout>
    );
  }
}

/* Component Style */

const Layout = styled.div`
  display: flex;
`;

const Input = styled.input`
  background: rgba(255,255,255,0.4);
  border: none;
  position: relative;
  display: block;
  outline: none;
  width: 400px;
  margin: 5px 0rem 5px 1rem;
  color: #333;
  -webkit-box-shadow: 0 2px 10px 1px rgba(0,0,0,0.5);
  box-shadow: 0 2px 10px 1px rgba(0,0,0,0.5);
`;
