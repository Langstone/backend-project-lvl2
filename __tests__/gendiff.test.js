/* global test, expect */
/* eslint-disable max-len */

import { join } from 'path';
import parser from '../parsers/parser.js';
import generateDiff from '../formatters/stylish.js';
import diffFiles from '../diff.js';
import plainFormatter from '../formatters/plain.js';
import jsonFormatter from '../formatters/json.js';

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

test('check parser', () => {
  expect(parser(getFixturePath('nested_one.yaml'))).toStrictEqual(
    {
      common: {
        setting1: 'Value 1', setting2: 200, setting3: true, setting6: { doge: { wow: null }, key: 'value' },
      },
      group1: { baz: 'bas', foo: 'bar', nest: { key: 'value' } },
      group2: { abc: 12345, deep: { id: null } },
    },
  );
});

test('check diff', () => {
  expect(diffFiles(parser(getFixturePath('nested_one.yaml')), parser(getFixturePath('nested_two.yaml')))).toStrictEqual(
    {
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
 },
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
}`,
  );
});

test('check plain', () => {
  expect(plainFormatter(diffFiles(parser(getFixturePath('nested_one.yaml')), parser(getFixturePath('nested_two.yaml'))))).toBe(
    `Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting6.doge.wow' was updated. From null to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'common.follow' was added with value: false
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`,
  );
});
test('chect json formatter', () => {
  expect(jsonFormatter(diffFiles(parser(getFixturePath('nested_one.yaml')), parser(getFixturePath('nested_two.yaml'))))).toBe(
    // eslint-disable-next-line quotes
    `{"common":{"setting1":{"__equal__":true,"__after__":"Value 1","__before__":"Value 1"},"setting2":{"__equal__":false,"__before__":200},"setting3":{"__equal__":false,"__after__":null,"__before__":true},"setting6":{"key":{"__equal__":true,"__after__":"value","__before__":"value"},"doge":{"wow":{"__equal__":false,"__after__":"so much","__before__":null}},"ops":{"__equal__":false,"__after__":"vops"}},"follow":{"__equal__":false,"__after__":false},"setting4":{"__equal__":false,"__after__":"blah blah"},"setting5":{"__equal__":false,"__after__":{"key5":"value5"}}},"group1":{"baz":{"__equal__":false,"__after__":"bars","__before__":"bas"},"foo":{"__equal__":true,"__after__":"bar","__before__":"bar"},"nest":{"__equal__":false,"__after__":"str","__before__":{"key":"value"}}},"group2":{"__equal__":false,"__before__":{"abc":12345,"deep":{"id":null}}},"group3":{"__equal__":false,"__after__":{"deep":{"id":{"number":45}},"fee":100500}}}`,
  );
});
