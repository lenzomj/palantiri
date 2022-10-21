import { Scenario, setupScenario } from './scenario.mjs';

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
    this.displayArea = new Array();
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
  }

  select(scenarioName) {
    if (!Scenario.hasOwnProperty(scenarioName)) {
      return;
    }
    this.reset();
    const encounterSetNames = Scenario[scenarioName];
    this.encounterDeck = this.cardLibrary.reduce(encounterSetNames);
    this.state.scenario = scenarioName;
    setupScenario(this, scenarioName);
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

  display(stagingIndex) {
    let staged = this.state.stagingArea[stagingIndex];
    if (staged) {
      this.state.stagingArea.splice(stagingIndex, 1);
      this.state.displayArea.push(staged);
    }
  }

  stage(displayIndex) {
    let displayed = this.state.displayArea[displayIndex];
    if (displayed) {
      this.state.displayArea.splice(displayIndex, 1);
      this.state.stagingArea.push(displayed);
    }
  }

  hide(displayIndex) {
    let displayed = this.state.displayArea[displayIndex];
    if (displayed) {
      this.state.displayArea.splice(displayIndex, 1);
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
    let found = this.encounterDeck.getQuestByName(cardName);
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
      case "display":
        this.state.displayArea[index]?.flip();
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
