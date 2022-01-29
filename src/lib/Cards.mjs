export const Scenarios = {
  "Passage Through Mirkwood": ["Passage Through Mirkwood",
                               "Spiders of Mirkwood",
                               "Dol Guldur Orcs"],

  "The Hunt for Gollum":      ["The Hunt for Gollum",
                               "Journey Down the Anduin",
                               "Sauron's Reach"],
};

export default class DeckBuilder {

  static DefaultScenarioName = "Passage Through Mirkwood";

  getDeck(scenarioName) {
    if (!Scenarios.hasOwnProperty(scenarioName)) {
      return undefined;
    }

    let scenarioDeck = new Map();
    const encounterSetNames = Scenarios[scenarioName];
    for (let [index, card] of Object.entries(this.library)) {
      const cardType = card.sides.A.type;
      const cardSet = card.cardencounterset;
      if (encounterSetNames.includes(cardSet)) {
        scenarioDeck.set(index, card);
      }
    }
    return scenarioDeck;
  }

  setActiveDeck(scenarioName) {
    this.activeDeck = this.getDeck(scenarioName);
  }

  getActiveDeck() {
    return this.activeDeck;
  }

  constructor(cardLibrary) {
    this.library = cardLibrary;
    this.activeDeck = this.getDeck(DeckBuilder.DefaultScenarioName);
  }
}
