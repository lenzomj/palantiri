import React, { Component } from "react";
import styled from "styled-components";

import Card from "./Card"

const imageServer = "https://palantiri.s3.amazonaws.com/images";

export default class PlayBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      activeQuest,
      activeLocation,
      stagingArea,
      engagementArea,
      displayArea,
    } = this.props.appState.gameState;

    return (
      <Layout>
        <StagingArea>
          {stagingArea.map((card, key) => {
            return (
              <Card key={key} id={key} card={card} context="staged" onSelect={this.props.onCardSelected} />
            );
          })}
        </StagingArea>
        <QuestArea>
          <Card card={activeQuest} context="quest" onSelect={this.props.onCardSelected} />
          {displayArea.map((card, key) => {
            return (
              <Card key={key} id={key} card={card} context="displayed" onSelect={this.props.onCardSelected} />
            );
          })}
        </QuestArea>
        <LocationArea>
          <Card card={activeLocation} context="traveled" onSelect={this.props.onCardSelected} />
        </LocationArea>
        <EngagementArea>
          {engagementArea.map((card, key) => {
            return (
              <Card key={key} id={key} card={card} context="engaged" onSelect={this.props.onCardSelected} />
            );
          })}
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
  border-left: 1px dotted rgba(255, 255, 255, 0.4);
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
  border-top: 1px dotted rgba(255, 255, 255, 0.4);
`;
