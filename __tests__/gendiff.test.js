const parser = require('../parsers/parser.js');
const generateDiff = require('../stylish.js');
const path = require('path');
const diffFiles = require('../diff.js');
const { type } = require('os');

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

  test('check parser', () => {
    expect(parser(getFixturePath('nested_one.yaml'))).toStrictEqual(
      {"common": {"setting1": "Value 1", "setting2": 200, "setting3": true, "setting6": {"doge": {"wow": null}, "key": "value"}}, "group1": {"baz": "bas", "foo": "bar", "nest": {"key": "value"}}, "group2": {"abc": 12345, "deep": {"id": null}}});
  });

  test('check diff', () => {
    expect(diffFiles(parser(getFixturePath('nested_one.yaml')), parser(getFixturePath('nested_two.yaml')))).toStrictEqual(
      {"common": {"follow": {"__after__": false, "__before__": undefined, "__equal__": false}, "setting1": {"__after__": "Value 1", "__before__": "Value 1", "__equal__": true}, "setting2": {"__after__": undefined, "__before__": 200, "__equal__": false}, "setting3": {"__after__": null, "__before__": true, "__equal__": false}, "setting4": {"__after__": "blah blah", "__before__": undefined, "__equal__": false}, "setting5": {"__after__": {"key5": "value5"}, "__before__": undefined, "__equal__": false}, "setting6": {"doge": {"wow": {"__after__": "so much", "__before__": null, "__equal__": false}}, "key": {"__after__": "value", "__before__": "value", "__equal__": true}, "ops": {"__after__": "vops", "__before__": undefined, "__equal__": false}}}, "group1": {"baz": {"__after__": "bars", "__before__": "bas", "__equal__": false}, "foo": {"__after__": "bar", "__before__": "bar", "__equal__": true}, "nest": {"__after__": "str", "__before__": {"key": "value"}, "__equal__": false}}, "group2": {"__after__": undefined, "__before__": {"abc": 12345, "deep": {"id": null}}, "__equal__": false}, "group3": {"__after__": {"deep": {"id": {"number": 45}}, "fee": 100500}, "__before__": undefined, "__equal__": false}}
    );
  });

  test('check stylish', () => {
    expect(generateDiff(diffFiles(parser(getFixturePath('nested_one.yaml')), parser(getFixturePath('nested_two.yaml'))))).toBe(
  `{
      common: {
          setting1: Value 1
        - setting2: 200
        - setting3: true
        + setting3: null
          setting6: {
              key: value
              doge: {
                - wow: null
                + wow: so much
              }
            + ops: vops
          }
        + follow: false
        + setting4: blah blah
        + setting5: {
            key5: value5
          }
      }
      group1: {
        - baz: bas
        + baz: bars
          foo: bar
        - nest: {
            key: value
          }
        + nest: str
      }
    - group2: {
        abc: 12345
          deep: {
            id: null
          }
      }
    + group3: {
          deep: {
              id: {
                number: 45
              }
          }
        fee: 100500
      }
  }`);
  });