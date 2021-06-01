const _ = require('lodash');

function defineType(value) {
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
}

function simpleRecursion(obj, oldKey = '') {
  let result = [];
  let currentKey = oldKey;
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (_.isPlainObject(value)) {
      const previousKeys = `${currentKey}${key}`;
      if ('__equal__' in value) {
        if (value.__equal__ === false) {
          if (value.__before__ === undefined) {
            if (_.isPlainObject(value.__after__)) {
              result.push(`Property '${previousKeys}' was added with value: [complex value]`);
            } else {
              result.push(`Property '${previousKeys}' was added with value: ${defineType(value.__after__)}`);
            }
          } else if (value.__after__ === undefined) {
            result.push(`Property '${previousKeys}' was removed`);
          } else if (_.isPlainObject(value.__after__)) {
            result.push(`Property '${previousKeys}' was updated. From ${defineType(value.__before__)} to [complex value]`);
          } else if (_.isPlainObject(value.__before__)) {
            result.push(`Property '${previousKeys}' was updated. From [complex value] to ${defineType(value.__after__)}`);
          } else {
            result.push(`Property '${previousKeys}' was updated. From ${defineType(value.__before__)} to ${defineType(value.__after__)}`);
          }
        }
      } else {
        currentKey = `${previousKeys}.`;

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

module.exports = plainFormatter;
