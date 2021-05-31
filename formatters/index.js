const plainFormatter = require('./plain.js');
const stylishFormatter = require('./stylish.js');

function getFormatter(type = 'plain') {
  if (type === 'plain') {
    return plainFormatter;
  }
  else if (type === 'stylish') {
    return stylishFormatter;
  }
}

module.exports = getFormatter;