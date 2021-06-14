import _ from 'lodash';

function defineType(value) {
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
}

function simpleRecursion(obj, oldKey = '') {
  let result = [];
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (_.isPlainObject(value)) {
      if ('equal' in value) {
        if (value.equal === false) {
          if (value.before === undefined) {
            if (_.isPlainObject(value.after)) {
              result.push(`Property '${oldKey}${key}' was added with value: [complex value]`);
            } else {
              result.push(`Property '${oldKey}${key}' was added with value: ${defineType(value.after)}`);
            }
          } else if (value.after === undefined) {
            result.push(`Property '${oldKey}${key}' was removed`);
          } else if (_.isPlainObject(value.after)) {
            result.push(`Property '${oldKey}${key}' was updated. From ${defineType(value.before)} to [complex value]`);
          } else if (_.isPlainObject(value.before)) {
            result.push(`Property '${oldKey}${key}' was updated. From [complex value] to ${defineType(value.after)}`);
          } else {
            result.push(`Property '${oldKey}${key}' was updated. From ${defineType(value.before)} to ${defineType(value.after)}`);
          }
        }
      } else {
        const currentKey = `${oldKey}${key}.`;
        result = result.concat(simpleRecursion(value, currentKey));
      }
    }
  });
  return result;
}

function plainFormatter(obj) {
  return simpleRecursion(obj).join('\n');
}

export default plainFormatter;
