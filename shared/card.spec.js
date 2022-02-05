import Library from './library.mjs'
import { loadLibraryFromFile } from './library_loader.mjs'

const library = loadLibraryFromFile('./shared/data/cards.json');

test('A card is ready when played', () => {
  const card = library.getCardByName("Necromancer's Pass");
  expect(card.state.exhausted).toBeFalsy();
});

test('A quest card has a unique image front and back', () => {
  let card = library.getCardByName("Out of the Dungeons");
  expect(card.state.image).toBe("51223bd0-ffd1-11df-a976-0801200c9000/Cards/51223bd0-ffd1-11df-a976-0801200c9131.jpg");
  card.flip();
  expect(card.state.image).toBe("51223bd0-ffd1-11df-a976-0801200c9000/Cards/51223bd0-ffd1-11df-a976-0801200c9131-B.jpg");
});

test('An encounter card has a common card back image', () => {
  let card = library.getCardByName("Endless Caverns");
  card.flip();
  expect(card.state.image).toBe("encounter_cardback.jpg");
});

test('A player card has a common card back image', () => {
  let card = library.getCardByName("Strider's Path");
  card.flip();
  expect(card.state.image).toBe("player_cardback.jpg");
});
test('User can exhaust a card', () => {
  let card = library.getCardByName("Dol Guldur Orcs");
  card.exhaust();
  expect(card.state.exhausted).toBeTruthy();
});

test('User can flip a card', () => {
  let card = library.getCardByName("Dol Guldur Orcs");
  expect(card.state.side).toBe("A");
  card.flip();
  expect(card.state.side).toBe("B");
  card.flip();
  expect(card.state.side).toBe("A");
});

test('User can attach a card to another card', () => {
  let objective = library.getCardByName("Shadow Key");
  let guard = library.getCardByName("Cavern Guardian");
  objective.attach(guard);
  expect(objective.attachments.size).toBe(1);
  expect(objective.attachments.get(guard.uuid)).toBeDefined();
});
