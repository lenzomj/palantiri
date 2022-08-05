import React, { Component } from "react";
import styled from "styled-components";

import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

import { wsSendMessage } from "../lib/WebSocket";

const imageServer = "https://palantiri.s3.amazonaws.com/images";

const Attachments = (props) => {
  const { cards, onSelect } = props;
  return (
    <React.Fragment>
      {cards.map((attachment, key) => {
        return (
          <Attachment
            src={`${imageServer}/${attachment.state.image}`}
            key={key}
            offset={key + 1}
            onClick={onSelect}
          />
        );
      })}
    </React.Fragment>
  );
};

export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  renderCardFace(id, card, context, onSelect) {
    switch (context) {
      case "quest":
        return (
          <React.Fragment>
            <Menu
              menuButton={
                <TappedCardFace
                  src={`${imageServer}/${
                    card?.state.image ?? "unselected_cardback.png"
                  }`}
                  onClick={onSelect}
                />
              }
              arrow
              onItemClick={(e) => wsSendMessage(this.context.playerID, e.value)}
            >
              {this.renderMenuOptions(id, context)}
            </Menu>
          </React.Fragment>
        );
      default:
        return (
          <React.Fragment>
            <Menu
              menuButton={
                <CardFace
                  src={`${imageServer}/${
                    card?.state.image ?? "unselected_cardback.png"
                  }`}
                  onClick={onSelect}
                />
              }
              arrow
              onItemClick={(e) => wsSendMessage(this.context.playerID, e.value)}
            >
              {this.renderMenuOptions(id, context)}
            </Menu>
          </React.Fragment>
        );
    }
  }

  renderMenuOptions(id, context) {
    switch (context) {
      case "staged":
        return (
          <React.Fragment>
            <MenuItem value={`/flip ${id} staging`}>Flip</MenuItem>
            <MenuItem value={`/engage ${id}`}>Engage</MenuItem>
            <MenuItem value={`/travel ${id}`}>Travel</MenuItem>
            <MenuItem value={`/discard ${id}`}>Discard</MenuItem>
            <MenuItem value={`/display ${id}`}>Display</MenuItem>
          </React.Fragment>
        );
      case "engaged":
        return (
          <React.Fragment>
            <MenuItem value={`/flip ${id} engagement`}>Flip</MenuItem>
            <MenuItem value={`/defeat ${id}`}>Defeat</MenuItem>
            <MenuItem value={`/return ${id}`}>Return</MenuItem>
          </React.Fragment>
        );
      case "traveled":
        return (
          <React.Fragment>
            <MenuItem value={`/flip 0 location`}>Flip</MenuItem>
            <MenuItem value={`/explore ${id}`}>Explore</MenuItem>
          </React.Fragment>
        );
      case "quest":
        return (
          <React.Fragment>
            <MenuItem value={`/flip 0 quest`}>Flip</MenuItem>
          </React.Fragment>
        );
      case "displayed":
        return (
          <React.Fragment>
            <MenuItem value={`/flip ${id} display`}>Flip</MenuItem>
            <MenuItem value={`/hide ${id}`}>Hide</MenuItem>
          </React.Fragment>
        );
      default:
        return <React.Fragment></React.Fragment>;
    }
  }

  render() {
    const { id, card, context, onSelect } = this.props;

    return (
      <CardFrame>
        {this.renderCardFace(id, card, context, onSelect)}
        <Attachments cards={card?.attachments ?? []} onSelect={onSelect} />
      </CardFrame>
    );
  }
}

const CardFrame = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: auto;
  height: auto;

  position: relative;
`;

const CardFace = styled.img`
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
`;

const TappedCardFace = styled(CardFace)`
  width: auto;
  height: 75px;
`;

const Attachment = styled.img`
  position: absolute;
  top: ${(props) => 25 * props.offset}px;
  left: ${(props) => 15 * props.offset}px;
  z-index: ${(props) => 1 * props.offset};
  cursor: pointer;
  width: 85px;
  height: auto;
`;

/*
 &:hover {
    border: 1px solid white;
    border-radius: 8px;
    z-index: 999;
  }
*/
