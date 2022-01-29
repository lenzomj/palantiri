import React, { Component } from 'react';
import styled from "styled-components";

export default class PlayBox extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <Layout>
        <Quest src="images/player_cardback.jpg" />
        <Encounter src="images/player_cardback.jpg" />
        <Encounter src="images/player_cardback.jpg" />
      </Layout>
    );
  }
}

const Layout = styled.div`
  display: flex;
`;

const Encounter = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 2px solid white;
  border-radius: 8px;
  width: 100px;
`;

const Quest = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 2px solid white;
  border-radius: 8px;
  width: 100px;
`;
