import _ from 'lodash';

function diffFiles(obj1, obj2) {
  const result = {};
  const primeUniqKeys = _.uniq(_.concat(_.keys(obj1), _.keys(obj2)));
  const uniqKeys = primeUniqKeys.sort();

  uniqKeys.forEach((uniqKey) => {
    const uniqKeyResult = {
      __equal__: false,
      __after__: undefined,
      __before__: undefined,
    };

    if (obj1[uniqKey] !== undefined && obj2[uniqKey] !== undefined) {
      const recursionRequired = _.isPlainObject(obj1[uniqKey]) && _.isPlainObject(obj2[uniqKey]);
      if (recursionRequired) {
        result[uniqKey] = diffFiles(obj1[uniqKey], obj2[uniqKey]);
      } else {
        uniqKeyResult.__equal__ = obj1[uniqKey] === obj2[uniqKey];
        uniqKeyResult.__before__ = obj1[uniqKey];
        uniqKeyResult.__after__ = obj2[uniqKey];
        result[uniqKey] = uniqKeyResult;
      }
    } else if (obj1[uniqKey] !== undefined) {
      uniqKeyResult.__before__ = obj1[uniqKey];
      result[uniqKey] = uniqKeyResult;
    } else {
      uniqKeyResult.__after__ = obj2[uniqKey];
      result[uniqKey] = uniqKeyResult;
    }
  });
  return result;
}

export default diffFiles;
