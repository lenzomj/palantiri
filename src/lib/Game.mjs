export const Scenarios = {
  "Passage Through Mirkwood": ["Passage Through Mirkwood",
                               "Spiders of Mirkwood",
                               "Dol Guldur Orcs"],

  "The Hunt for Gollum":      ["The Hunt for Gollum",
                               "Journey Down the Anduin",
                               "Sauron's Reach"],
};

export const DefaultScenario = "Passage Through Mirkwood";

const MAX_PLAYERS = 2;

export class GameState {
  static Default = new GameState();

  static Replacer = (key, value) => {
    if(value instanceof Map) {
      return {
        dataType: 'Map',
        value: Array.from(value.entries())
      };
    } else {
      return value;
    }
  }

  static Reviver = (key, value) => {
    if(typeof value === 'object' && value !== null) {
      if (value.dataType === 'Map') {
        return new Map(value.value);
      }
    }
    return value;
  }

  constructor() {
    this.scenario = undefined;
    this.scenarioDeck = new Map();
    this.players = new Map();
    this.activeQuest = undefined;
    this.activeLocation = undefined;
    this.stagingArea = new Array();
    this.encounterArea = new Map();
    this.attachments = new Map();
  }
};

export const getCardBackSrc = (cardID, scenarioDeck) => {
  let src;
  if (scenarioDeck.has(cardID)) {
    let card = scenarioDeck.get(cardID);
    src = `images/cards/${card.cardsetid}/Cards/${cardID}.jpg`
  }
  return src;
}

export default class Game {

  constructor(cardLibrary) {
    this.cards = cardLibrary;
    this.state = GameState.Default;
    this.select(DefaultScenario);
  }

  select(scenarioName) {
    if (!Scenarios.hasOwnProperty(scenarioName)) {
      return;
    }
    this.state.scenarioDeck = new Map();
    const encounterSetNames = Scenarios[scenarioName];
    for (let [index, card] of Object.entries(this.cards)) {
      const cardType = card.sides.A.type;
      const cardSet = card.cardencounterset;
      if (encounterSetNames.includes(cardSet)) {
        this.state.scenarioDeck.set(index, card);
      }
    }
    this.state.scenario = scenarioName;
  }

  join(playerID, name) {
    if (this.state.players.size < MAX_PLAYERS) {
      this.state.players.set(playerID, name);
      console.log(`${playerID} has joined the game as '${name}'`);
    }
  }

  leave(playerID) {
    if (this.state.players.has(playerID)) {
      this.state.players.delete(playerID);
      console.log(`${playerID} has left the game'`);
    }
  }

  reveal(cardName) {
    let cardIndex;
    this.state.scenarioDeck.forEach((card, index) => {
      if (card.sides.A.name === cardName) {
        cardIndex = index;
      }
    });
    if (cardIndex) {
      console.log(`Revealed ${cardIndex} => ${cardName}`);
      this.state.stagingArea.push(cardIndex);
    }
  }

  clearStagingArea() {
    this.state.stagingArea = [ ];
  }

  getStateAsJSON () {
    return JSON.stringify(this.state, GameState.Replacer);
  }

}
