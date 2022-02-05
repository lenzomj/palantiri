import { Scenario } from './scenario.mjs';

export const DefaultScenario = "Passage Through Mirkwood";

const MAX_PLAYERS = 2;

export class GameState {

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
    this.players = new Map();
    this.scenario = undefined;
    this.activeQuest = undefined;
    this.activeLocation = undefined;
    this.stagingArea = new Array();
    this.engagementArea = new Array();
  }
};

export default class Game {

  constructor(library) {
    this.cardLibrary = library;
    this.reset();
  }

  reset () {
    this.encounterDeck = undefined;
    this.state = new GameState();
  }

  select(scenarioName) {
    if (!Scenario.hasOwnProperty(scenarioName)) {
      return;
    }
    const encounterSetNames = Scenario[scenarioName];
    this.encounterDeck = this.cardLibrary.reduce(encounterSetNames);
    this.state.scenario = scenarioName;
  }

  join(playerID, name) {
    if (this.state.players.size < MAX_PLAYERS) {
      this.state.players.set(playerID, name);
    }
  }

  leave(playerID) {
    if (this.state.players.has(playerID)) {
      this.state.players.delete(playerID);
    }
  }

  reveal(cardName) {
    if (this.encounterDeck) {
      let revealed = this.encounterDeck.getCardByName(cardName);
      if (revealed) {
        this.state.stagingArea.push(revealed);
      }
    }
  }

  discard(stagingIndex) {
    let staged = this.state.stagingArea[stagingIndex];
    if (staged) {
      this.state.stagingArea.splice(stagingIndex, 1);
    }
  }

  quest(cardName) {
    let found = this.encounterDeck.getCardByName(cardName);
    if (found) {
      this.state.activeQuest = found;
    }
  }

  travel(stagingIndex) {
    let oldActiveLocation = this.state.activeLocation;
    let newActiveLocation = this.state.stagingArea[stagingIndex];

    if (!newActiveLocation) {
      return;
    } else if (oldActiveLocation) {
      this.state.stagingArea.push(oldActiveLocation);
    }
    this.state.activeLocation = newActiveLocation;
    this.state.stagingArea.splice(stagingIndex, 1);
  }

  explore() {
    if (this.state.activeLocation) {
      this.state.activeLocation = undefined;
    }
  }

  engage(stagingIndex) {
    let staged = this.state.stagingArea[stagingIndex];
    if (staged) {
      this.state.stagingArea.splice(stagingIndex, 1);
      this.state.engagementArea.push(staged);
    }
  }

  return(engagementIndex) {
    let engaged = this.state.engagementArea[engagementIndex];
    if (engaged) {
      this.state.engagementArea.splice(engagementIndex, 1);
      this.state.stagingArea.push(engaged);
    }
  }

  defeat(engagementIndex) {
    let engaged = this.state.engagementArea[engagementIndex];
    if (engaged) {
      this.state.engagementArea.splice(engagementIndex, 1);
    }
  }

  exportState () {
    return JSON.stringify(this.state, GameState.Replacer);
  }

  importState (jsonState) {
    this.state = JSON.parse(jsonState, GameState.Reviver);
  }
}
