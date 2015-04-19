import {isNumber} from 'js-type-check';
import ef from 'simple-error-factory';
import validator from './main';

const NumberError = ef('number');

const validators = [
  {
    name: 'min',
    fn: function(x, min) {
      return x >= min;
    }
  },
  {
    name: 'max',
    fn: function(x, max) {
      return x <= max;
    }
  }
];

/**
 * validators = import {number} from validators
 * {number: [min, max], string: [length, chars]}
 *
 * above are mutable and therefore can be added to
 *
 * schema accepts optional validators
 * {number: [equals]}
 *
 * createSchema(schema, validators)
 * iterate validators and concat extras
 */

export default (schema, doc) => {

  let val = doc[schema.field];

  if (!isNumber(val)) {
    return new TypeError(`${val} is not a Number`);
  }

  let [valid, failures] = validator(validators, schema, val);

  return valid ? doc : NumberError(failures);

}
