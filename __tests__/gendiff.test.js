const generateDiff = require('../generate_diff.js');
const path = require('path');

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('difference between two JSON files', () => {

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

test('difference between two YAML files', () => {
  
  expect(generateDiff(getFixturePath('one.yaml'), getFixturePath('two.yaml'))).toBe(
`{
  - name: Pavel
  + name: Veronika
    adress: Omsk
  - phone: 79503327348
  + phone: 79083337744
  - profession: teacher
  + profession: confectioner
  - age: 31
  + friends: null
}`);
});