#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync } from 'fs';
// import _, { isArray } from 'lodash';

const genDiff = new Command();

genDiff.version('0.0.1');

genDiff
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action(generateDiff)
  .parse(process.agrv);

function generateDiff(filepath1, filepath2, options) {

  const obj1 = JSON.parse(readFileSync(filepath1, 'utf8')); 
  const obj2 = JSON.parse(readFileSync(filepath2, 'utf8'));

  const diff1 = {};
 
  Object.keys(obj1).forEach(key1 => {
    if (obj1[key1] !== obj2[key1]) {
      diff1[key1] = [obj1[key1], obj2[key1]]
    } else {
      diff1[key1] = obj1[key1]
    }
  });

  Object.keys(obj2).forEach(key2 => {
    if (typeof obj1[key2] !== 'undefined') {
      return;
    }
    diff1[key2] = [undefined, obj2[key2]]
  });
  console.log(diff1);
  console.log("{");
  
  Object.keys(diff1).forEach(key => {
    if (Array.isArray(diff1[key])) {
      if (diff1[key][0] !== undefined && diff1[key][1] === undefined) {
        console.log(`  - ${key}: ${diff1[key][0]}`);
      } 
      else if (diff1[key][1] !== undefined && diff1[key][0] === undefined) {
        console.log(`  + ${key}: ${diff1[key][1]}`);
      }
      else {
        console.log(`  - ${key}: ${diff1[key][0]}`);
        console.log(`  + ${key}: ${diff1[key][1]}`);
      }
    }
    else {
      console.log(`    ${key}: ${diff1[key]}`);
    }
  })
  console.log("}");
};