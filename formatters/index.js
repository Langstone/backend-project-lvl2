const jsonFormatter = require('./json');
const plainFormatter = require('./plain');
const stylishFormatter = require('./stylish');

function getFormatter(type = 'plain') {
  let fn;
  if (type === 'plain') {
    fn = plainFormatter;
  } else if (type === 'stylish') {
    fn = stylishFormatter;
  } else {
    fn = jsonFormatter;
  }
  return fn;
}

module.exports = getFormatter;
