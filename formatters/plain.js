import _ from 'lodash';

function defineType(value) {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
}

function simpleRecursion(obj, oldKey = '') {
  const result = Object.keys(obj).map((key) => {
    const value = obj[key];
    if (_.isPlainObject(value)) {
      if ('equal' in value) {
        if (value.equal === false) {
          if (value.before === undefined) {
            if (_.isPlainObject(value.after)) {
              return `Property '${oldKey}${key}' was added with value: [complex value]`;
            }
            return `Property '${oldKey}${key}' was added with value: ${defineType(value.after)}`;
          } if (value.after === undefined) {
            return `Property '${oldKey}${key}' was removed`;
          } if (_.isPlainObject(value.after)) {
            return `Property '${oldKey}${key}' was updated. From ${defineType(value.before)} to [complex value]`;
          } if (_.isPlainObject(value.before)) {
            return `Property '${oldKey}${key}' was updated. From [complex value] to ${defineType(value.after)}`;
          }
          return `Property '${oldKey}${key}' was updated. From ${defineType(value.before)} to ${defineType(value.after)}`;
        }
      }
      const currentKey = `${oldKey}${key}.`;
      return simpleRecursion(value, currentKey);
    }
    return '';
  });
  return _.flattenDeep(result.filter((e) => e));
}

function plainFormatter(obj) {
  return simpleRecursion(obj).join('\n');
}

export default plainFormatter;
