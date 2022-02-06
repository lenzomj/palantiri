import React, { Component } from 'react';
import styled from "styled-components";

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

export default class PlayBox extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    const {activeQuest, activeLocation,
           stagingArea, engagementArea } = this.props.appState.gameState;
    return (
      <Layout>
        <StagingArea>
          {
            stagingArea.map((card, key) => {
              return (
                <CardBox key={key}>
                <Card
                      src={`${imageServer}/${card.state.image}`}
                      onClick={this.props.onCardSelected} />
                <Attachments cards={card.attachments}
                             onClick={this.props.onCardSelected} />
                </CardBox>
              );
            })
          }
        </StagingArea>
        <QuestArea>
          <CardBox>
            <QuestCard src={`${imageServer}/${activeQuest?.state.image}`}
                       onClick={this.props.onCardSelected} />
          </CardBox>
        </QuestArea>
        <LocationArea>
          <CardBox>
            <Card src={`${imageServer}/${activeLocation?.state.image ?? "unselected_cardback.png"}`}
                  onClick={this.props.onCardSelected} />
          </CardBox>
        </LocationArea>
        <EngagementArea>
          {
            engagementArea.map((card, key) => {
              return (
                <CardBox key={key}>
                <Card
                      src={`${imageServer}/${card.state.image}`}
                      onClick={this.props.onCardSelected} />
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
  display: flex;
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
  /*transition: transform .2s;*/

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

  /*&:hover {
    position:relative;
    border: 1px solid white;
    border-radius: 8px;
    transform: scale(4.0) translate(30px, 30px);
    z-index:999;
  }*/
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


const TappedCard = styled(Card)`
  transform: rotate(90deg);
`;

const QuestCard = styled(Card)`
  width: auto;
  height: 75px;
`;
