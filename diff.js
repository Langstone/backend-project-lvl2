import _ from 'lodash';

function getDiffPart(before, after) {
  return { equal: before === after, before, after };
}

function diffFiles(obj1, obj2) {
  const uniqKeys = _.uniq(_.sortBy(_.concat(_.keys(obj1), _.keys(obj2))));

  const result = uniqKeys.map((uniqKey) => {
    if (obj1[uniqKey] !== undefined && obj2[uniqKey] !== undefined) {
      const recursionRequired = _.isPlainObject(obj1[uniqKey]) && _.isPlainObject(obj2[uniqKey]);
      if (recursionRequired) {
        return [uniqKey, diffFiles(obj1[uniqKey], obj2[uniqKey])];
      }
      return [uniqKey, getDiffPart(obj1[uniqKey], obj2[uniqKey])];
    } if (obj1[uniqKey] !== undefined) {
      return [uniqKey, getDiffPart(obj1[uniqKey])];
    }
    return [uniqKey, getDiffPart(undefined, obj2[uniqKey])];
  });

  return Object.fromEntries(result);
}

export default diffFiles;
