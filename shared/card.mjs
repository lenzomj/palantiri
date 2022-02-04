import { v4 as uuidv4 } from 'uuid';

export default class Card {
  constructor(record) {
    this.uuid = uuidv4();
    this.text = record;
    this.props = {
      "exhausted": false,
      "side": "A",
      "image": `${this.getFrontImage()}`
    };
    this.attachments = new Map();
  }

  getFrontImage() {
    return `${this.text.cardsetid}/Cards/${this.text.cardid}.jpg`
  }

  getBackImage() {
    if (this.text.sides.B.name === "player") {
      return "player_cardback.jpg";
    } else if (this.text.sides.B.name === "encounter") {
      return "encounter_cardback.jpg";
    } else {
      return `${this.text.cardsetid}/Cards/${this.text.cardid}-B.jpg`
    }
  }

  exhaust() {
    this.props.exhausted = !this.props.exhausted;
  }

  flip() {
    if (this.props.side === "A") {
      this.props.side = "B";
      this.props.image = this.getBackImage();
    } else {
      this.props.side = "A";
      this.props.image = this.getFrontImage();
    }
  }

  attach(otherCard) {
    this.attachments.set(otherCard.uuid, otherCard);
  }
}
