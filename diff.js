import _ from 'lodash';

function diffFiles(obj1, obj2) {
  const uniqKeys = _.uniq(_.concat(_.keys(obj1), _.keys(obj2))).sort();

  const result = uniqKeys.map((uniqKey) => {
    if (obj1[uniqKey] !== undefined && obj2[uniqKey] !== undefined) {
      const recursionRequired = _.isPlainObject(obj1[uniqKey]) && _.isPlainObject(obj2[uniqKey]);
      if (recursionRequired) {
        return [uniqKey, diffFiles(obj1[uniqKey], obj2[uniqKey])];
      }
      return [uniqKey, {
        equal: obj1[uniqKey] === obj2[uniqKey],
        before: obj1[uniqKey],
        after: obj2[uniqKey],
      }];
    } if (obj1[uniqKey] !== undefined) {
      return [uniqKey, {
        equal: false,
        before: obj1[uniqKey],
      }];
    }
    return [uniqKey, {
      equal: false,
      after: obj2[uniqKey],
    }];
  });

  return Object.fromEntries(result);
}

export default diffFiles;
