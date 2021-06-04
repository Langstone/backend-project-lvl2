import generateDiff from './stylish.js';

function jsonFormatter(obj) {
  return JSON.parse(generateDiff(obj));
}

export default jsonFormatter;
