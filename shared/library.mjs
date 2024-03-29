import Card from './card.mjs';

export default class Library {
  static fromJSON(json) {
    let library = new Library();
    for (let [recordID, record] of Object.entries(json)) {
      library.addRecord(record);
    }
    return library;
  }

  constructor() {
    this.records = new Map();
  }

  forEach(callBackFn) {
    return this.records.forEach(callBackFn);
  }

  getSize() {
    return this.records.size;
  }

  addRecord(record) {
    this.records.set(record.cardid, record);
  }

  getRecordByID(recordID) {
    return this.records.get(recordID);
  }

  reduce(encounterSetNames) {
    let reduced = new Library();
    this.records.forEach((record, recordID) => {
      let recordSet = record.cardencounterset;
      if (encounterSetNames.includes(recordSet)) {
        reduced.addRecord(record);
      }
    });
    return reduced;
  }

  getQuestByName(name) {
    let card;
    this.records.forEach((record, recordID) => {
      if (record.sides.A.name.toLowerCase() === name.toLowerCase()) {
        if (record.sides.A.type === "Quest") {
          card = new Card(record);
        }
      }
    });
    return card;
  }

  getCardByName(name) {
    let card;
    this.records.forEach((record, recordID) => {
      if (record.sides.A.name.toLowerCase() === name.toLowerCase()) {
        if (record.sides.A.type != "Quest") {
          card = new Card(record);
        }
      }
    });
    return card;
  }

}
