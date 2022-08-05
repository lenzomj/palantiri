export const Scenario = {
  "Passage Through Mirkwood": ["Passage Through Mirkwood",
                               "Spiders of Mirkwood",
                               "Dol Guldur Orcs"],

  "Journey Down the Anduin":  ["Journey Down the Anduin",
                               "Sauron's Reach",
                               "Dol Guldur Orcs",
                               "Wilderlands"],

  "Escape from Dol Guldur":   ["Escape from Dol Guldur",
                               "Spiders of Mirkwood",
                               "Dol Guldur Orcs"],

  "The Hunt for Gollum":      ["The Hunt for Gollum",
                               "Journey Down the Anduin",
                               "Sauron's Reach"],

  "Conflict at the Carrock":  ["Conflict at the Carrock",
                               "Journey Down the Anduin",
                               "Wilderlands"],

  "Return to Mirkwood":       ["Return to Mirkwood",
                               "Spiders of Mirkwood",
                               "Wilderlands"],

  "Into the Pit":             ["Into the Pit",
                               "Twists and Turns",
                               "Hazards of the Pit",
                               "Goblins of the Deep"],

  "The Seventh Level":        ["The Seventh Level",
                               "Plundering Goblins",
                               "Goblins of the Deep"],

  "Flight from Moria":        ["Flight from Moria",
                               "Hazards of the Pit",
                               "Deeps of Moria",
                               "Plundering Goblins"]
};

export const setupScenario = (game, scenario) => {
  switch(scenario) {
    case "Passage Through Mirkwood":
      game.quest("Flies and Spiders");
      game.reveal("Forest Spider");
      game.reveal("Old Forest Road");
      game.flip("quest", 0);
      break;
    case "Journey Down the Anduin":
      game.quest("To the River...");
      game.reveal("Hill Troll");
      game.display(0);
      break;
    case "Escape from Dol Guldur":
      game.quest("The Necromancer's Tower");
      game.reveal("Nazgul of Dol Guldur");
      game.display(0);
      game.reveal("Shadow Key");
      game.reveal("Gandalf's Map");
      game.reveal("Dungeon Torch");
      break;
    case "The Hunt for Gollum":
      game.quest("The Hunt Begins");
      break;
    case "Conflict at the Carrock":
      game.quest("Grimbeorn's Quest");
      game.reveal("The Carrock");
      game.reveal("Rupert");
      game.reveal("Stuart");
      game.reveal("Morris");
      game.reveal("Louis");
      game.display(4);
      game.display(3);
      game.display(2);
      game.display(1);
      break;
    case "Return to Mirkwood":
      game.quest("Through the Forest");
      game.reveal("Gollum");
      game.display(0);
      break;
    case "Into the Pit":
      game.quest("Entering the Mines");
      game.reveal("East-Gate");
      game.reveal("Bridge of Khazad-Dum");
      game.reveal("First Hall");
      game.reveal("Cave Torch");
      game.travel(0);
      game.display(0);
      game.display(0);
      game.display(0);
      game.flip("quest", 0);
      break;
    case "The Seventh Level":
      game.quest("Search for the Chamber");
      game.reveal("Book of Mazarbul");
      game.display(0);
      game.flip("quest", 0);
      break;
    case "Flight from Moria":
      game.quest("A Presence in the Dark");
      game.reveal("The Nameless Fear");
      break;
    default:
      break;
  }
};

