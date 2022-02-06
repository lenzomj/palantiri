import { Scenario } from './scenario.mjs';

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
    this.showArea = new Array();
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

  default() {
    this.select("Passage Through Mirkwood");
    this.quest("Flies and Spiders");
    this.reveal("Forest Spider");
    this.reveal("Old Forest Road");
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

  show(cardName) {
    if (this.encounterDeck) {
      let shown = this.encounterDeck.getCardByName(cardName);
      if (shown) {
        this.state.showArea.push(shown);
      }
    }
  }

  hide(showIndex) {
    let shown = this.state.showArea[showIndex];
    if (shown) {
      this.state.showArea.splice(showIndex, 1);
    }
  }

  discard(stagingIndex) {
    let staged = this.state.stagingArea[stagingIndex];
    if (staged) {
      this.state.stagingArea.splice(stagingIndex, 1);
    }
  }

  attach(stagingIndex, cardName) {
    let staged = this.state.stagingArea[stagingIndex];
    let attachment = this.cardLibrary.getCardByName(cardName);
    if (staged && attachment) {
      staged.attach(attachment);
    }
  }

  detach(stagingIndex, attachmentIndex) {
    let staged = this.state.stagingArea[stagingIndex];
    if (staged) {
      staged.detach(attachmentIndex);
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

  flip(area, index) {
    switch(area) {
      case "quest":
        this.state.activeQuest?.flip();
        break;
      case "location":
        this.state.activeLocation?.flip();
        break;
      case "engagement":
        this.state.engagementArea[index]?.flip();
        break;
      case "staging":
        this.state.stagingArea[index]?.flip();
        break;
      default:
        break;
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
