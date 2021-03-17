const fs = require('fs');
const { result } = require('lodash');

function generateDiff(filepath1, filepath2) {

  const obj1 = JSON.parse(fs.readFileSync(filepath1, 'utf8')); 
  const obj2 = JSON.parse(fs.readFileSync(filepath2, 'utf8'));

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
  const result = ['{'];
  Object.keys(diff1).forEach(key => {

    if (Array.isArray(diff1[key])) {
      if (diff1[key][0] !== undefined && diff1[key][1] === undefined) {
        result.push(`  - ${key}: ${diff1[key][0]}`);
      } 
      else if (diff1[key][1] !== undefined && diff1[key][0] === undefined) {
        result.push(`  + ${key}: ${diff1[key][1]}`);
      }
      else {
        result.push(`  - ${key}: ${diff1[key][0]}`);
        result.push(`  + ${key}: ${diff1[key][1]}`);
      }
    }
    else {
      result.push(`    ${key}: ${diff1[key]}`);
    }
  })
  result.push('}');
  return result.join('\n');
};

module.exports = generateDiff;