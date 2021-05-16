#!/usr/bin/env node
const diffFiles = require('./diff.js');
const parser = require('./parsers/parser.js');
const Commander = require('commander');
const generateDiff = require('./stylish.js');
const genDiff = new Commander.Command();

genDiff.version('0.0.1');

genDiff
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {

    const obj1 = parser(filepath1);
    const obj2 = parser(filepath2);
    const diffObj = diffFiles(obj1, obj2);

    const output = generateDiff(diffObj);
    console.log(output);
  })
  .parse(process.argv);
