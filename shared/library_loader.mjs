import fs from 'fs';
import Library from './library.mjs';

export const loadLibraryFromFile = (path) => {
  let data = fs.readFileSync(path);
  return Library.fromJSON(JSON.parse(data));
}
