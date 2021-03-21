#!/usr/bin/env node
const Commander = require('commander');
const generateDiff = require('./generate_diff');
const genDiff = new Commander.Command();

genDiff.version('0.0.1');

genDiff
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const output = generateDiff(filepath1, filepath2);
    console.log(output);
  })
  .parse(process.argv);
