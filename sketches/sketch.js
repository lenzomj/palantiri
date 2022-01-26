const Scenario = require("./Scenario.js");
const Game = require("./Game.js");


var game = new Game();
game.select("The Hunt for Gollum");
game.setActiveQuest("The Hunt Begins");

/*for (let card of Scenario.TheHuntForGollum.getQuestDeck().values()) {
  console.log(card);
}*/
