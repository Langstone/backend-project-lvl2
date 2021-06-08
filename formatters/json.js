import _ from 'lodash';

function simpleRecursion(obj, lvl) {
  let result = [];
  const indent = '  ';
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (!_.isPlainObject(value)) {
      result.push(`${indent.repeat(lvl + 1)}${key}: ${value}`);
    } else {
      result.push(`${indent.repeat(lvl + 2)}${key}: {`);
      result = result.concat(simpleRecursion(value, lvl + 2));
    }
  });
  result.push(`${indent.repeat(lvl)} }`);
  return result;
}

function stringifyValue(value, lvl) {
  if (_.isPlainObject(value)) {
    const result = simpleRecursion(value, lvl + 1).join('\n');
    return `{\n${result}`;
  }

  return `${value}`;
}

function complexRecursion(obj, lvl = 1) {
  let result = [];
  const indent = '  ';
  const repeatIndent = indent.repeat(lvl);
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if ('__equal__' in value) {
      if (value.__equal__ === true) {
        result.push(`${indent.repeat(lvl + 1)}${key}: ${stringifyValue(value.__before__, lvl)}`);
      } else if (value.__equal__ === false) {
        if (value.__before__ === undefined) {
          result.push(`${repeatIndent}+ ${key}: ${stringifyValue(value.__after__, lvl)}`);
        } else if (value.__after__ === undefined) {
          result.push(`${repeatIndent}- ${key}: ${stringifyValue(value.__before__, lvl)}`);
        } else {
          result.push(`${repeatIndent}- ${key}: ${stringifyValue(value.__before__, lvl)}`);
          result.push(`${repeatIndent}+ ${key}: ${stringifyValue(value.__after__, lvl)}`);
        }
      }
    } else {
      result.push(`${indent.repeat(lvl + 1)}${key}: {`);
      const recursionResult = complexRecursion(value, lvl + 2);
      result = result.concat(recursionResult);
      result.push(`${indent.repeat(lvl + 1)}}`);
    }
  });
  return result;
}

function jsonFormatter(obj) {
  let result = ['{'];
  result = result.concat(complexRecursion(obj));
  result.push('}');
  return result.join('\n');
}

export default jsonFormatter;
