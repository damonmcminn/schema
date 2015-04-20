import typeValidators from './typeValidators';
import * as tc from 'js-type-check';

export default function addValidators(additional) {

  let isArray = tc.isArray(additional);
  let isDefined = !tc.isUndefined(additional);
  let invalidObjects;
  let valid;

  if (isArray) {
    valid = additional.filter(x => {
      return !tc.isFunction(x.type)
        || !tc.isString(x.name)
        || !tc.isFunction(x.fn);
    }).length === 0;
  }

  if (!isDefined) {
    return typeValidators;
  } else if (valid) {
    additional.forEach(a => {
      a.type = a.type.prototype.constructor.name.toLowerCase();
    });
    return typeValidators.concat(additional);
  } else {
    throw new TypeError('A validator is not in form {type,name,fn}');
  }

}
