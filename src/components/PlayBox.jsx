import React, { Component } from 'react';
import styled from "styled-components";

import {getCardBackSrc} from '../lib/Game.mjs'

export default class PlayBox extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    console.log(this.props.appState.gameState.stagingArea);
    return (
      <Layout>
        { this.props.appState.gameState.stagingArea.map((index, i) => {
          let src = getCardBackSrc(index, this.props.appState.gameState.scenarioDeck);
          return <Encounter key= {i} src={src} onClick={this.props.onCardSelected} />
        })}
        <Quest src="images/encounter_cardback.jpg" onClick={this.props.onCardSelected} />
        <Encounter src="images/encounter_cardback.jpg" onClick={this.props.onCardSelected} />
      </Layout>
    );
  }
}

/*const Layout = styled.div`
  display: flex;
`;*/

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: minmax(100px, auto);
  gap: 20px;
`;


const Encounter = styled.img`
  display: block;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 2px solid white;
  border-radius: 8px;
  width: 75px;
`;

const Quest = styled.img`
  display: block;
  cursor: pointer;

  transform: rotate(90deg);
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 2px solid white;
  border-radius: 8px;
  width: 75px;
`;
