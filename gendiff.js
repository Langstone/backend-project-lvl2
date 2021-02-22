#!/usr/bin/env node

import { Command } from 'commander';
const genDiff = new Command();

genDiff.version('0.0.1');

genDiff
.description('Compares two configuration files and shows a difference.')


genDiff.parse(process.agrv);

  
