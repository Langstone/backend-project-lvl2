import plainFormatter from './plain.js';
import jsonFormatter from './json.js';
import stylishFormatter from './stylish.js';

function getFormatter(type = 'plain') {
  let fn;
  if (type === 'plain') {
    fn = plainFormatter;
  } else if (type === 'stylish') {
    fn = stylishFormatter;
  } else if (type === 'json') {
    fn = jsonFormatter;
  } else {
    fn = plainFormatter;
  }
  return fn;
}

export default getFormatter;
