#!/usr/bin/env node
import Commander from 'commander';
import getFormatter from './formatters/index.js';
import diffFiles from './diff.js';
import parser from './parsers/parser.js';

function genDiff(filepath1, filepath2) {
  const programm = new Commander.Command();
  programm.version('0.0.1');
  programm
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format [type]', 'output format', 'stylish')
    .action(() => {
      const options = programm.opts();
      const formatter = getFormatter(options.format);
      const obj1 = parser(filepath1);
      const obj2 = parser(filepath2);
      const diffObj = diffFiles(obj1, obj2);
      const output = formatter(diffObj);
      // eslint-disable-next-line no-console
      console.log(output);
    })
    .parse(process.argv);
}
export default genDiff;
