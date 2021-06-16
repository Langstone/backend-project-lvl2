import _ from 'lodash';

function diffFiles(obj1, obj2) {
  const result = {};
  const uniqKeys = _.uniq(_.concat(_.keys(obj1), _.keys(obj2))).sort();

  uniqKeys.forEach((uniqKey) => {
    const uniqKeyResult = {
      equal: false,
      after: undefined,
      before: undefined,
    };

    if (obj1[uniqKey] !== undefined && obj2[uniqKey] !== undefined) {
      const recursionRequired = _.isPlainObject(obj1[uniqKey]) && _.isPlainObject(obj2[uniqKey]);
      if (recursionRequired) {
        result[uniqKey] = diffFiles(obj1[uniqKey], obj2[uniqKey]);
      } else {
        uniqKeyResult.equal = obj1[uniqKey] === obj2[uniqKey];
        uniqKeyResult.before = obj1[uniqKey];
        uniqKeyResult.after = obj2[uniqKey];
        result[uniqKey] = uniqKeyResult;
      }
    } else if (obj1[uniqKey] !== undefined) {
      uniqKeyResult.before = obj1[uniqKey];
      result[uniqKey] = uniqKeyResult;
    } else {
      uniqKeyResult.after = obj2[uniqKey];
      result[uniqKey] = uniqKeyResult;
    }
  });
  return result;
}

export default diffFiles;
