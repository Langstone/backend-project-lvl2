import generateDiff from './stylish.js';

function jsonFormatter(obj) {
  return generateDiff(obj);
}

export default jsonFormatter;
