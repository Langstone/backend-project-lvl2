const generateDiff = require('../generate_diff.js');
const url = require('url');
const path = require('path');


test('difference between two JSON files', () => {

  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  // const __filename = url.fileURLToPath(url);
  // const __dirname = path.dirname(__filename);

  expect(generateDiff(getFixturePath('one.json'), getFixturePath('two.json'))).toBe(
`{
  - name: Pavel
  + name: Veronika
  - phone: +79503327348
  + phone: +79083337744
    adress: Omsk, Beregovoi
  - age: 31
  + profession: confectioner
  + friends: 
}`);
});