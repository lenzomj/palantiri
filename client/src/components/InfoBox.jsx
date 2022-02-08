import React, { Component } from 'react';
import styled from "styled-components";

const defaultImage = "https://palantiri.s3.amazonaws.com/images/unselected_cardback.png";

export default class InfoBox extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    const view = this.props.appState.playerView ?? defaultImage;
    return (
    <Layout>
      <Preview src={view} />
    </Layout>
    );
  }
}

/* Component Style */

const Layout = styled.div`
  display: flex;
`;

const Preview = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 2px solid white;
  border-radius: 8px;
  width: 60%;
  transition: transform .2s;

  &:hover {
    position:relative;
    border: 1px solid white;
    border-radius: 8px;
    transform: scale(1.5) translate(-30px, 40px);
    z-index:999;
  }
`;

