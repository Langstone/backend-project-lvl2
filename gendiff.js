#!/usr/bin/env node

import Commander from 'commander';
import getFormatter from './formatters/index.js';
import diffFiles from './diff.js';
import parser from './parsers/parser.js';

const command = new Commander.Command();

command.version('0.0.1');

command
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'plain')
  .action((filepath1, filepath2) => {
    const options = command.opts();
    const formatter = getFormatter(options.format);
    const obj1 = parser(filepath1);
    const obj2 = parser(filepath2);
    const diffObj = diffFiles(obj1, obj2);
    const output = formatter(diffObj);
    // eslint-disable-next-line no-console
    console.log(output);
  })
  .parse(process.argv);

function genDiff(filepath1, filepath2) {
  return command.action(filepath1, filepath2);
}
export default genDiff;
