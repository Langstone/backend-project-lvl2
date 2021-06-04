import getFormatter from './formatters/index.js';
import diffFiles from './diff.js';
import parser from './parsers/parser.js';

export default function compare(filepath1, filepath2) {
  const formatter = getFormatter();
  const obj1 = parser(filepath1);
  const obj2 = parser(filepath2);
  const diffObj = diffFiles(obj1, obj2);
  const output = formatter(diffObj);
  return output;
}
