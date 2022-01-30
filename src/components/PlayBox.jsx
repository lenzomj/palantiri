import React, { Component } from 'react';
import styled from "styled-components";

import {getCardFrontSrc} from '../lib/Game.mjs'

export default class PlayBox extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    const {activeQuest, activeLocation,
           stagingArea, engagementArea,
           scenarioDeck } = this.props.appState.gameState;

    return (
      <Layout>
        <StagingArea>
          {
            stagingArea.map((uuid, key) => {
              return (
                <Card key={key}
                      data-uuid={uuid}
                      data-slot={key}
                      data-area="staging"
                      src={getCardFrontSrc(uuid, scenarioDeck)}
                      onClick={this.props.onCardSelected} />
              );
            })
          }
        </StagingArea>
        <QuestArea>
          <QuestCard data-uuid={activeQuest}
                     data-slot="0"
                     data-area="quest"
                     src={getCardFrontSrc(activeQuest, scenarioDeck)}
                     onClick={this.props.onCardSelected} />
        </QuestArea>
        <LocationArea>
          <Card data-uuid={activeLocation}
                data-slot="0"
                data-area="location"
                src={getCardFrontSrc(activeLocation, scenarioDeck)}
                onClick={this.props.onCardSelected} />
        </LocationArea>
        <EngagementArea>
          {
            engagementArea.map((uuid, key) => {
              return (
                <Card key={key}
                      data-uuid={uuid}
                      data-slot={key}
                      data-area="engagement"
                      src={getCardFrontSrc(uuid, scenarioDeck)}
                      onClick={this.props.onCardSelected} />
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
`;

const LocationArea = styled.div`
  grid-area: location;
`;

const EngagementArea = styled.div`
  grid-area: engage;
  display: flex;
  flex-wrap: wrap;
  border-top: 1px dotted rgba(255,255,255,0.4);

`;

const Card = styled.img`
  display: block;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 85px;
  height: auto;
  transition: transform .2s;

  /* Disable Draggable Images */
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;

  &:hover {
    position:relative;
    border: 1px solid white;
    border-radius: 8px;
    transform: scale(4.0) translate(30px, 30px);
    z-index:999;
  }
`;

const TappedCard = styled(Card)`
  transform: rotate(90deg);
`;

const QuestCard = styled(Card)`
  width: auto;
  height: 75px;
`;
