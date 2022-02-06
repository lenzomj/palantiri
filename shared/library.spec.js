import Library from './library.mjs'
import { loadLibraryFromFile } from './library_loader.mjs'

const library = loadLibraryFromFile('./shared/data/cards.json');

test('User can load a library from a JSON manifest', () => {
  expect(library).toBeDefined();
  expect(library.getSize()).toBe(4844);
});

test('User can retrieve a record by ID', () => {
  let record = library.getRecordByID("51223bd0-ffd1-11df-a976-0801200c9094");
  expect(record.sides.A.name).toBe("Necromancer's Pass");
  expect(record.cardpackname).toBe("Core Set");
});

test('User can reduce the library to a single encounter set', () => {
  let reducedLibrary = library.reduce(["Passage Through Mirkwood"]);
  expect(reducedLibrary.getSize()).toBe(9);
  reducedLibrary.forEach((record, recordID) => {
    expect(record.cardencounterset).toBe("Passage Through Mirkwood");
  });
});

test('User can reduce the library to several encounter sets', () => {
  let encounterSets = ["Passage Through Mirkwood",
                       "Spiders of Mirkwood",
                       "Dol Guldur Orcs"];
  let reducedLibrary = library.reduce(encounterSets);
  expect(reducedLibrary.getSize()).toBe(23);
  reducedLibrary.forEach((record, recordID) => {
    expect(encounterSets).toContain(record.cardencounterset);
  });
});

test('User can obtain a unique card instance by record name', () => {
  let card1 = library.getCardByName("Necromancer's Pass");
  let card2 = library.getCardByName("Necromancer's Pass");
  expect(card1.props.sides.A.name).toBe(card2.props.sides.A.name);
  expect(card1.props.cardid).toBe(card2.props.cardid);
  expect(card1.uuid).not.toBe(card2.uuid);
});



