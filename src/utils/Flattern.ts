// https://gist.github.com/penguinboy/762197

// Pablohpsilva commented on Oct 7
export const flattenObj = (obj) => {
  if (!obj) {
    throw Error(`flattenObj function expects an Object, received ${typeof obj}`);
  }
  return Object.keys(obj).reduce((acc, curr) => {
    const objValue = obj[curr];
    const ret = objValue && objValue instanceof Object
      ? flattenObj(objValue)
      : {[curr]: objValue};
    return Object.assign(acc, ret);
  }, {});
};
