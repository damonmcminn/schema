import typeValidators from './typeValidators';
import * as tc from 'js-type-check';

export default function addValidators(additional) {

  let isArray = tc.isArray(additional);
  let isDefined = !tc.isUndefined(additional);
  let invalidObjects;
  let valid;

  if (isArray) {
    valid = additional.filter(x => {
      return !tc.isString(x.type)
        || !tc.isString(x.name)
        || !tc.isFunction(x.fn);
    }).length === 0;
  }

  if (!isDefined) {
    return typeValidators;
  } else if (valid) {
    return Array.prototype.concat(typeValidators, additional);
  } else {
    let err = new TypeError('A validator is not in form {type,name,fn}');
    throw err;
  }

}
