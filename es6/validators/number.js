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

export default (schema, doc) => {

  let val = doc[schema.field];

  if (!isNumber(val)) {
    return new TypeError(`${val} is not a Number`);
  }

  let [valid, failures] = validator(validators, schema, val);

  return valid ? doc : NumberError(failures);

}
