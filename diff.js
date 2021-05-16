const util = require('util');
const _ = require('lodash');

function diffFiles(obj1, obj2) {

  const result = {};

  const uniqKeys = _.uniq(_.concat(_.keys(obj1), _.keys(obj2)));
  
  uniqKeys.forEach(uniqKey => {

    const uniqKeyResult = {
      __equal__: false,
      __after__: undefined,
      __before__: undefined,
    };

    if (obj1[uniqKey] !== undefined && obj2[uniqKey] !== undefined) {
      if (_.isArray(obj1[uniqKey]) || _.isPlainObject(obj2[uniqKey])) {
        result[uniqKey] = diffFiles(obj1[uniqKey], obj2[uniqKey]);
      }
      else {
        uniqKeyResult.__equal__ = obj1[uniqKey] === obj2[uniqKey];
        uniqKeyResult.__before__ = obj1[uniqKey];
        uniqKeyResult.__after__ = obj2[uniqKey];
        result[uniqKey] = uniqKeyResult;
      }
    }
    else if (obj1[uniqKey] !== undefined) {
      uniqKeyResult.__before__ = obj1[uniqKey];
      result[uniqKey] = uniqKeyResult;
    }
    else {
      uniqKeyResult.__after__ = obj2[uniqKey];
      result[uniqKey] = uniqKeyResult;
    }
  });
  return result;
};

module.exports = diffFiles;



