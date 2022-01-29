import React, { Component } from 'react';
import styled from "styled-components";

export default class InfoBox extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
    <Layout>
      <Preview src={this.props.appState.playerView} />
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
  width: 250px;
`;

