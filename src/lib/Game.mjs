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
    this.engagementArea = new Array();
    this.attachments = new Map();
  }
};

export const getCardFrontSrc = (uuid, scenarioDeck) => {
  let src;
  if (scenarioDeck.has(uuid)) {
    let card = scenarioDeck.get(uuid);
    src = `images/cards/${card.cardsetid}/Cards/${uuid}.jpg`
  }
  return src;
}

export default class Game {

  constructor(cardLibrary) {
    this.cards = cardLibrary;
    this.state = GameState.Default;
    this.select(DefaultScenario);
    this.quest("Flies and Spiders");
  }

  select(scenarioName) {
    if (!Scenarios.hasOwnProperty(scenarioName)) {
      return;
    }
    this.state.scenarioDeck = new Map();
    const encounterSetNames = Scenarios[scenarioName];
    for (let [uuid, card] of Object.entries(this.cards)) {
      const cardType = card.sides.A.type;
      const cardSet = card.cardencounterset;
      if (encounterSetNames.includes(cardSet)) {
        this.state.scenarioDeck.set(uuid, card);
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

  findCardByName(cardName) {
    let revealed;
    this.state.scenarioDeck.forEach((card, uuid) => {
      if (card.sides.A.name.toLowerCase() === cardName.toLowerCase()) {
        revealed = uuid;
      }
    });
    return revealed;
  }

  reveal(cardName) {
    let revealed = this.findCardByName(cardName);
    if (revealed) {
      console.log(`Revealed ${cardName}`);
      this.state.stagingArea.push(revealed);
    }
  }

  quest(cardName) {
    let quest = this.findCardByName(cardName);
    if (quest) {
      console.log(`Set active quest to ${cardName}`);
      this.state.activeQuest = quest;
    }
  }

  travel(stagingKey) {
    console.log(`Traveling to ${stagingKey}`);
  }

  clearStagingArea() {
    this.state.stagingArea = [ ];
  }

  getStateAsJSON () {
    return JSON.stringify(this.state, GameState.Replacer);
  }

}
