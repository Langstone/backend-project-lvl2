import _ from 'lodash';

function simpleRecursion(obj, lvl) {
  const indent = '  ';
  const result = Object.keys(obj).map((key) => {
    const value = obj[key];
    if (!_.isPlainObject(value)) {
      return [[`${indent.repeat(lvl + 2)}${key}: ${value}`]];
    }
    return [[`${indent.repeat(lvl + 2)}${key}: {`], [simpleRecursion(value, lvl + 2)]];
  });
  return _.flattenDeep([[_.flattenDeep(result)], [`${indent.repeat(lvl)}}`]]);
}

function stringifyValue(value, lvl) {
  if (_.isPlainObject(value)) {
    const result = simpleRecursion(value, lvl + 1).join('\n');
    return `{\n${result}`;
  }
  return `${value}`;
}

function complexRecursion(obj, lvl = 1) {
  const indent = '  ';
  const repeatIndent = indent.repeat(lvl);
  const result = Object.keys(obj).map((key) => {
    const value = obj[key];
    if ('equal' in value) {
      if (value.equal === true) {
        return `${indent.repeat(lvl + 1)}${key}: ${stringifyValue(value.before, lvl)}`;
      } if (value.equal === false) {
        if (value.before === undefined) {
          return `${repeatIndent}+ ${key}: ${stringifyValue(value.after, lvl)}`;
        } if (value.after === undefined) {
          return `${repeatIndent}- ${key}: ${stringifyValue(value.before, lvl)}`;
        }
        return [[`${repeatIndent}- ${key}: ${stringifyValue(value.before, lvl)}`], [`${repeatIndent}+ ${key}: ${stringifyValue(value.after, lvl)}`]];
      }
    }
    return [[`${indent.repeat(lvl + 1)}${key}: {`], [complexRecursion(value, lvl + 2)], [`${indent.repeat(lvl + 1)}}`]];
  });
  return _.flattenDeep(result);
}

function generateDiff(obj) {
  return _.flattenDeep([['{'], [complexRecursion(obj)], ['}']]).join('\n');
}

export default generateDiff;
