const GameState = {
  scenario: "Not Selected",
  players: {
    "player1": undefined,
    "player2": undefined,
    "player3": undefined,
    "player4": undefined
  },
  activeQuest: undefined,
  activeLocation: undefined,
  stagingArea: [ ],
  encounterArea: {
    "player1": [ ],
    "player2": [ ],
    "player3": [ ],
    "player4": [ ]
  },
  attachments: { }
};

export default GameState;
