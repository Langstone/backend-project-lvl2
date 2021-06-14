import _ from 'lodash';

console.log('!!!!!!!!');

function simpleRecursion(obj, oldKey = '') {
  let result = [];
  let currentKey = oldKey;
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (_.isPlainObject(value)) {
      if ('__equal__' in value) {
        if (value.__equal__ === false) {
          if (value.__before__ === undefined) {
            if (_.isPlainObject(value.__after__)) {
              result.push(`Property '${oldKey}${key}' was added with value: [complex value]`);
            } else {
              result.push(`Property '${oldKey}${key}' was added with value: ${value.__after__}`);
            }
          } else if (value.__after__ === undefined) {
            result.push(`Property '${oldKey}${key}' was removed`);
          } else if (_.isPlainObject(value.__after__)) {
            result.push(`Property '${oldKey}${key}' was updated. From ${value.__before__} to [complex value]`);
          } else if (_.isPlainObject(value.__before__)) {
            result.push(`Property '${oldKey}${key}' was updated. From [complex value] to ${value.__after__}`);
          } else {
            result.push(`Property '${oldKey}${key}' was updated. From ${value.__before__} to ${value.__after__}`);
          }
        }
      } else {
        currentKey = `${oldKey}${key}.`;
        result = result.concat(simpleRecursion(value, currentKey));
      }
    }
  });
  return result;
}

function plainFormatter(obj) {
  let result = [];
  result = result.concat(simpleRecursion(obj));
  return result.join('\n');
}

export default plainFormatter;
