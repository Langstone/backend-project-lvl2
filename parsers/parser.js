import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

function parser(filepath) {
  if (path.extname(`${filepath}`) === '.json') {
    return JSON.parse(fs.readFileSync(filepath, 'utf8'));
  }
  return yaml.load(fs.readFileSync(filepath, 'utf8'));
}
export default parser;
