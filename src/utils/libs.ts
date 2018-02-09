import * as mapValues from 'lodash/mapValues';
import * as map from 'lodash/map';
import * as sum from 'lodash/sum';
import * as filter from 'lodash/filter';

export const parseint = (value) => value === undefined || value === '' ? undefined : parseInt(value, 10);
export const parsefloat = (value) => value === undefined || value === '' ? undefined : parseFloat(value);

/*
 * A= {a:1, b:2, c:{id:1}, d: {id: 1}}
 * Also add _destroy: false to Array
 */
export const flatIDValue = (a) => {
  if (Array.isArray(a)) { // eslint-disable-line
    const destroyArray = a.map((item) => ({
      ...item,
      '_destroy': false
    }));
    return destroyArray.map(flatIDValue); // Run Self Function!
  }
  // If a = object
  const r = mapValues(a, (value) => {
    if (value == null) {
      return value;
    }
    if (typeof value === 'object' && value.hasOwnProperty('id')) { // eslint-disable-line
      return parseInt(value.id, 10);
    }
    if (Array.isArray(value)) { // eslint-disable-line
      const destroyArray = value.map((item) => ({
        ...item,
        '_destroy': false
      }));
      return destroyArray.map(flatIDValue); // Run Self Function!
    }
    return value;
  });
  return r;
};

/*
 * _.omit
 * https://github.com/apollographql/apollo-client/issues/2160
 */
export const removeTypename = (value) => {
  if (value === null || value === undefined) {
    return value;
  } else if (Array.isArray(value)) {
    return value.map((v) => removeTypename(v));
  } else if (typeof value === 'object') {
    const newObj = {};
    Object.entries(value).forEach(([key, v]) => {
      if (key !== '__typename') {
        newObj[key] = removeTypename(v);
      }
    });
    return newObj;
  }
  return value;
};

/*
 * Sum of Table without destroy column
 * [{...}]
 */
export function Sum(obArray, key, precision) {
  const result = sum(map(filter(obArray, (v) => v._destroy === false), (v) => v[key])); // eslint-disable-line
  if (result) {
    return result.toFixed(precision);
  }
  return 0;
}

/*
 * Count of Table without destroy column
 * [{...}]
 */
export function Count(obArray) {
  return filter(obArray, (v) => v._destroy === false).length; // eslint-disable-line
}

/*
 * _.omit(style.toJS()
 * Replace Value in Object in Array
 * <efdee>: yourarray.map(item => ({ ...item, weight: item.pcs*item.pointer }));
 * <joeytwiddle> array.forEach(obj => { obj.weight = obj.pcs * obj.pointer; });
 */

// Null check because null is a object.
export function fieldObjectorFalse(field){
  return typeof field.value === 'object' && field.value != null && field.value || false;
}
export function fieldIDorFalse(field){
  return fieldObjectorFalse(field) && parseInt(field.value.id) || false;
}
export function fieldSlugorFalse(field){
  return fieldObjectorFalse(field) && field.value.hasOwnProperty('slug') ? field.value.slug : false;
}
