import React from 'react';
import styled from "styled-components";

import Menu from './components/Menu';
import PlayBox from './components/PlayBox';
import InfoBox from './components/InfoBox';
import ChatBox from './components/ChatBox';

export class App extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Layout>
        <MenuPane> <Menu    /> </MenuPane>
        <PlayPane> <PlayBox /> </PlayPane>
        <InfoPane> <InfoBox /> </InfoPane>
        <ChatPane> <ChatBox /> </ChatPane>
      </Layout>
    );
  }
}

const Layout = styled.div`
  display: grid;
  width: 100%;
  grid-template-areas:
    "menu menu menu"
    "play play info"
    "play play chat";
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`;

const MenuPane = styled.div`
  grid-area: menu;
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

export default App
