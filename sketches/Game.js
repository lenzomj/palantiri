const Scenario = require("./Scenario.js");

class Game {

   constructor() {
      this.reset();
   }

   reset() {
      this.scenario = null;
      this.activeQuest = null;
      this.activeLocation = null;
      this.stagingArea = new Array();
      this.engagementArea = new Map();
      for (let playerName of ["Player1", "Player2", "Player3", "Player4"]) {
         this.engagementArea.set(playerName, new Array());
      }
   }

   select(scenarioName) {
      this.reset();
      this.scenario = Scenario.GetScenario(scenarioName);

      /*for (var {index, card} in encounterDeck.values) {

      }*/
   }

   setActiveQuest(questName) {
      if (this.scenario && this.scenario.hasQuestCard(questName)) {

      }
   }

}

module.exports = Game;
