import typeValidators from './typeValidators';
import * as tc from 'js-type-check';

export default function addValidators(additional) {

  let validators;
  let errors;
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
    validators = typeValidators;
  } else if (valid) {
    validators = Array.prototype.concat(typeValidators, additional);
  } else {
    let msg = 'A validator is not in form {type,name,fn}';
    [validators, errors] = [false, new TypeError(msg)];
  }

  return [validators, errors];

}
