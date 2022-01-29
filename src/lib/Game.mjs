//const Scenario = require("./Scenario.js");

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
    this.scenario = "Not Selected";
    this.players = new Map();
    this.activeQuest = undefined;
    this.activeLocation = undefined;
    this.stagingArea = new Array();
    this.encounterArea = new Map();
    this.attachments = new Map();
  }
};

export default class Game {

  constructor() {
    this.state = GameState.Default;
  }

  select(scenarioName) {
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

  getStateAsJSON () {
    return JSON.stringify(this.state, GameState.Replacer);
  }

}
