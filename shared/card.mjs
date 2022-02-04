import { v4 as uuidv4 } from 'uuid';

export default class Card {
  constructor(record) {
    this.uuid = uuidv4();
    this.props = record;
  }
}
