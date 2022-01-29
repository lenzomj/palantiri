const Library = require('./data/library.json');

class Scenario {
   static TheHuntForGollum = new Scenario("The Hunt for Gollum",
                                          "Journey Down the Anduin",
                                          "Sauron's Reach");

   static GetScenario(name) {
      for (let clsProp of Object.getOwnPropertyNames(Scenario)) {
         if (Scenario[clsProp] instanceof Scenario) {
            if (Scenario[clsProp].getName() == name) {
               return Scenario[clsProp];
            }
         }
      }
      return null;
   }

   constructor(...encounterSetNames) {
      this.encounterSetNames = encounterSetNames;
      this.questDeck = new Map();
      this.encounterDeck = new Map();

      for (var index in Library) {
         const card = Library[index];
         const cardType = card.sides.A.type;
         const cardSet = card.cardencounterset;

         if (!this.encounterSetNames.includes(cardSet)) {
            continue;
         }

         if (cardType == "Quest" && cardSet == this.encounterSetNames[0]) {
            this.questDeck.set(index, card);
         } else {
            this.encounterDeck.set(index, card);
         }
      }
   }

   getName() {
      return this.encounterSetNames[0];
   }

   getQuestDeck() {
      return this.questDeck;
   }

   getEncounterDeck() {
      return this.encounterDeck;
   }

   hasEncounterCard(cardName) {
      return this.hasCard(cardName, this.encounterDeck);
   }

   hasQuestCard(cardName) {
      return this.hasCard(cardName, this.questDeck);
   }

   hasCard(cardName, deck) {
      for (const [index, card] of deck.entries()) {
         if (card.sides.A.name == cardName) {
            return true;
         }
      }
      return false;
   }
}

module.exports = Scenario;
