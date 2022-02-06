import { v4 as uuidv4 } from 'uuid';

export default class Card {
  constructor(record) {
    this.uuid = uuidv4();
    this.props = record;
    this.state = {
      "exhausted": false,
      "side": "A",
      "image": `${this.getFrontImage()}`
    };
    this.attachments = new Map();
  }

  getFrontImage() {
    return `cards/${this.props.cardsetid}/Cards/${this.props.cardid}.jpg`
  }

  getBackImage() {
    if (this.props.sides.B.name === "player") {
      return "player_cardback.jpg";
    } else if (this.props.sides.B.name === "encounter") {
      return "encounter_cardback.jpg";
    } else {
      return `cards/${this.props.cardsetid}/Cards/${this.props.cardid}-B.jpg`
    }
  }

  exhaust() {
    this.state.exhausted = !this.state.exhausted;
  }

  flip() {
    if (this.state.side === "A") {
      this.state.side = "B";
      this.state.image = this.getBackImage();
    } else {
      this.state.side = "A";
      this.state.image = this.getFrontImage();
    }
  }

  attach(otherCard) {
    this.attachments.set(otherCard.uuid, otherCard);
  }
}
