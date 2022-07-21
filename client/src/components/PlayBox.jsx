import React, { Component } from 'react';
import styled from "styled-components";

import { wsSendMessage } from '../lib/WebSocket';

import {
      Menu,
      MenuItem,
      MenuButton
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css'

const imageServer = "https://palantiri.s3.amazonaws.com/images";

const Attachments = (props) => {
  const { cards } = props;
  return (
    <div>
    {
      cards.map((attachment, key) => {
        return (
          <Attachment src={`${imageServer}/${attachment.state.image}`}
                      key={key}
                      offset={key + 1}
                      onClick={props.onClick}/>
        );
      })
    }
    </div>
  );
}

const Display = (props) => {
  const { cards } = props;
  return (
    <div>
      <Card src={`${imageServer}/unselected_cardback.png`} />
      {
        cards.map((attachment, key) => {
          return (
            <DisplayItem src={`${imageServer}/${attachment.state.image}`}
                        key={key}
                        offset={key + 1}
                        onClick={props.onClick}/>
          );
        })
      }
    </div>
  );
}

export default class PlayBox extends Component {

  constructor (props) {
    super(props);
  }


  render () {
    const {activeQuest, activeLocation,
           stagingArea, engagementArea, displayArea } = this.props.appState.gameState;
    return (
      <Layout>
        <StagingArea>
          {
            stagingArea.map((card, key) => {
              return (
                <CardBox key={key}>
                <Menu menuButton={
                <Card
                      src={`${imageServer}/${card.state.image}`}
                      onClick={this.props.onCardSelected} />
                }
                arrow
                onItemClick={(e) => wsSendMessage(this.props.appState.playerID, e.value)}>
                  <MenuItem value={`/flip ${key} staging`}>Flip</MenuItem>
                  <MenuItem value={`/engage ${key}`}>Engage</MenuItem>
                  <MenuItem value={`/travel ${key}`}>Travel</MenuItem>
                  <MenuItem value={`/discard ${key}`}>Discard</MenuItem>
                  <MenuItem value={`/display ${key}`}>Display</MenuItem>
                </Menu>
                <Attachments cards={card.attachments}
                             onClick={this.props.onCardSelected} />
                </CardBox>
              );
            })
          }
        </StagingArea>
        <QuestArea>
          <CardBox>
          <Menu menuButton={
            <QuestCard src={`${imageServer}/${activeQuest?.state.image}`}
                       onClick={this.props.onCardSelected} />
          }
          arrow
          onItemClick={(e) => wsSendMessage(this.props.appState.playerID, e.value)}>
            <MenuItem value={`/flip 0 quest`}>Flip</MenuItem>
          </Menu>
          </CardBox>
          <CardBox>
            <Display cards={displayArea}
                     onClick={this.props.onCardSelected} />
          </CardBox>
        </QuestArea>
        <LocationArea>
          <CardBox>
          <Menu menuButton={
            <Card src={`${imageServer}/${activeLocation?.state.image ?? "unselected_cardback.png"}`}
                  onClick={this.props.onCardSelected} />
          }
          arrow
          onItemClick={(e) => wsSendMessage(this.props.appState.playerID, e.value)}>
            <MenuItem value={`/explore `}>Explore</MenuItem>
          </Menu>
          </CardBox>
        </LocationArea>
        <EngagementArea>
          {
            engagementArea.map((card, key) => {
              return (
                <CardBox key={key}>
                <Menu menuButton={
                <Card
                      src={`${imageServer}/${card.state.image}`}
                      onClick={this.props.onCardSelected} />
                }
                arrow
                onItemClick={(e) => wsSendMessage(this.props.appState.playerID, e.value)}>
                  <MenuItem value={`/flip ${key} engagement`}>Flip</MenuItem>
                  <MenuItem value={`/defeat ${key}`}>Defeat</MenuItem>
                  <MenuItem value={`/return ${key}`}>Return</MenuItem>
                </Menu>
                <Attachments cards={card.attachments}
                             onClick={this.props.onCardSelected} />

                </CardBox>
              );
            })
          }
        </EngagementArea>
      </Layout>
    );
  }
}

const Layout = styled.div`
  display: grid;
  width: 100%;
  grid-template-areas:
    "staging quest  location"
    "engage  engage engage";
  grid-template-columns: 1fr 150px 150px;
  grid-template-rows: 1fr 1fr;
`;

const StagingArea = styled.div`
  grid-area: staging;
  display: flex;
  flex-wrap: wrap;
`;

const QuestArea = styled.div`
  grid-area: quest;
  display: block;
  border-left: 1px dotted rgba(255,255,255,0.4);
  padding-left: 1rem;
`;

const LocationArea = styled.div`
  grid-area: location;
  display: flex;
`;

const EngagementArea = styled.div`
  grid-area: engage;
  display: flex;
  flex-wrap: wrap;
  border-top: 1px dotted rgba(255,255,255,0.4);
`;

const CardBox = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: auto;
  height: auto;

  position: relative;
`;

const Card = styled.img`
  position: relative;
  top: 0px;
  left: 0px;
  z-index: auto;
  cursor: pointer;
  width: 85px;
  height: auto;

  /* Disable Draggable Images */
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;

  &:hover {
    border: 1px solid white;
    border-radius: 8px;
    z-index: 999;
  }
`;

const Attachment = styled.img`
  position: absolute;
  top: ${props => 25 * props.offset}px;
  left: ${props => 15 * props.offset}px;
  z-index: ${props => 1 * props.offset};
  cursor: pointer;
  width: 85px;
  height: auto;

  &:hover {
    border: 1px solid white;
    border-radius: 8px;
    z-index: 999;
  }
`;

const DisplayItem = styled.img`
  position: absolute;
  /*top: ${props => 25 * props.offset}px;*/
  left: ${props => 15 * props.offset}px;
  z-index: ${props => 1 * props.offset};
  cursor: pointer;
  width: 85px;
  height: auto;

  &:hover {
    border: 1px solid white;
    border-radius: 8px;
    z-index: 999;
  }
`;

const QuestCard = styled(Card)`
  width: auto;
  height: 75px;
`;
