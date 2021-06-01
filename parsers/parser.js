const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

function parser(filepath) {
  if (path.extname(`${filepath}`) === '.json') {
    return JSON.parse(fs.readFileSync(filepath, 'utf8'));
  }
  return yaml.load(fs.readFileSync(filepath, 'utf8'));
}

module.exports = parser;
