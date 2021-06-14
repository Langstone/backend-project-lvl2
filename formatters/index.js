import plainFormatter from './plain.js';
import jsonFormatter from './json.js';
import stylishFormatter from './stylish.js';

function getFormatter(type) {
  if (type === 'plain') {
    return plainFormatter;
  } if (type === 'stylish') {
    return stylishFormatter;
  } if (type === 'json') {
    return jsonFormatter;
  }
  return stylishFormatter;
}

export default getFormatter;
