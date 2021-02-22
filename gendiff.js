#!/usr/bin/env node

import { Command } from 'commander';
const genDiff = new Command();

genDiff.version('0.0.1');

genDiff
.description('Compares two configuration files and shows a difference.')
.arguments('<filepath1> <filepath2>')
.option('-f, --format [type]', 'output format')

genDiff.parse(process.agrv);

  
