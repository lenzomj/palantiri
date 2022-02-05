import Library from './library.mjs';
import { loadLibraryFromFile } from './library_loader.mjs';
import Game from './game.mjs';
import { Scenario } from './scenario.mjs';

const library = loadLibraryFromFile('./shared/data/cards.json');

const game = new Game(library);

beforeEach(() => {
  game.reset();
});

test('After creating a game, it includes a full card library', () => {
  expect(game.cardLibrary.getSize()).toBe(4844);
});

test('After selecting a known scenario, the game has an encounter deck', () => {
  game.select("Escape from Dol Guldur");
  expect(game.encounterDeck).toBeDefined();
  expect(game.state.scenario).toBe("Escape from Dol Guldur");
});

test('After selecting an unknown scenario, nothing happens', () => {
  expect(game.state.scenario).toBeUndefined();
  expect(game.state.encounterDeck).toBeUndefined();
  game.select("Some New Scenario");
  expect(game.state.scenario).toBeUndefined();
  expect(game.encounterDeck).toBeUndefined();
});

test('Up to MAX_PLAYERS can join the game', () => {
  game.join("123", "Player1");
  game.join("456", "Player2");
  game.join("789", "Player3");
  expect(game.state.players.keys()).toContain("123");
  expect(game.state.players.keys()).toContain("456");
  expect(game.state.players.keys()).not.toContain("789");
  expect(game.state.players.get("123")).toBe("Player1");
  expect(game.state.players.get("456")).toBe("Player2");
});

test('A player who has joined the game, can leave', () => {
  game.join("123", "Player1");
  expect(game.state.players.keys()).toContain("123");
  game.leave("123");
  expect(game.state.players.keys()).not.toContain("123");
});

test('When revealing a card, it enters the staging area', () => {
  game.select("Escape from Dol Guldur");
  game.reveal("Under the Shadow");
  game.reveal("CaveRn gUaRdian"); // Case insensitive
  expect(game.state.stagingArea[0].props.sides.A.name).toBe("Under the Shadow");
  expect(game.state.stagingArea[1].props.sides.A.name).toBe("Cavern Guardian");
});

test('When discarding a card, it leaves the staging area', () => {
  game.select("Escape from Dol Guldur");
  game.reveal("Under the Shadow"); // index 0
  game.reveal("Cavern Guardian");  // index 1
  game.reveal("Tower Gate");       // index 2
  game.discard(0);
  expect(game.state.stagingArea[0].props.sides.A.name).toBe("Cavern Guardian");
  game.discard("1"); // Parse Number
  expect(game.state.stagingArea.length).toBe(1);
});

test('When choosing a quest, it sets the active quest card', () => {
  game.select("Escape from Dol Guldur");
  game.quest("The necromancer's Tower"); // Case insensitive
  expect(game.state.activeQuest.props.sides.A.name).toBe("The Necromancer's Tower");
});

test('When traveling without an active location, it becomes the new active location', () => {
  game.select("Escape from Dol Guldur")
  game.reveal("Endless Caverns");
  game.travel(99); // Out of bounds index
  game.travel(0);
  expect(game.state.activeLocation.props.sides.A.name).toBe("Endless Caverns");
  expect(game.state.stagingArea.length).toBe(0);
});

test('When traveling with an active location, the locations swap', () => {
  game.select("Escape from Dol Guldur");
  game.reveal("Tower Gate");
  game.reveal("Endless Caverns");
  game.travel(0);
  expect(game.state.activeLocation.props.sides.A.name).toBe("Tower Gate");
  expect(game.state.stagingArea[0].props.sides.A.name).toBe("Endless Caverns");
  game.travel(0);
  expect(game.state.activeLocation.props.sides.A.name).toBe("Endless Caverns");
  expect(game.state.stagingArea[0].props.sides.A.name).toBe("Tower Gate");
});

test('Once a location is explored, it is no longer the active location', () => {
  game.select("Escape from Dol Guldur");
  game.reveal("Tower Gate");
  game.reveal("Endless Caverns");
  game.explore(); // No active location
  game.travel(0);
  expect(game.state.activeLocation).toBeDefined();
  game.explore();
  expect(game.state.activeLocation).toBeUndefined();
});

test('Upon engaging an enemy, it is moved into the engagement area', () => {
  game.select("Escape from Dol Guldur");
  game.reveal("Dungeon Jailor");
  game.engage(99); // Out of bounds index
  game.engage(0);
  expect(game.state.engagementArea[0].props.sides.A.name).toBe("Dungeon Jailor");
  expect(game.state.stagingArea.length).toBe(0);
});

test('Upon returning an enemy, it returns to the staging area', () => {
  game.select("Escape from Dol Guldur");
  game.reveal("Dungeon Jailor");
  game.engage(0);
  game.return(99); // Out of bounds index
  game.return(0);
  expect(game.state.stagingArea[0].props.sides.A.name).toBe("Dungeon Jailor");
  expect(game.state.engagementArea.length).toBe(0);
});

test('Upon defeating an enemy, it is discarded from the engagement area', () => {
  game.select("Escape from Dol Guldur");
  game.reveal("Dungeon Jailor");
  game.engage(0);
  game.defeat(99); // Out of bounds index
  game.defeat(0);
  expect(game.state.engagementArea.length).toBe(0);
  expect(game.state.stagingArea.length).toBe(0);
});

test('Game state is transferable as JSON', () => {
  game.select("Escape from Dol Guldur");
  game.quest("The Necromancer's Tower");
  game.reveal("Dungeon Jailor");
  game.reveal("Cavern Guardian");
  game.reveal("Endless Caverns");
  let initialState = game.exportState();
  game.engage(0);
  game.travel(1);
  let changedState = game.exportState();
  expect(initialState).not.toBe(changedState);
  game.importState(initialState);
  expect(game.state.stagingArea.length).toBe(3);
  expect(game.state.engagementArea.length).toBe(0);
  expect(game.state.activeLocation).toBeUndefined();
  game.importState(changedState);
  expect(game.state.stagingArea.length).toBe(1);
  expect(game.state.engagementArea.length).toBe(1);
  expect(game.state.activeLocation).toBeDefined();
});

