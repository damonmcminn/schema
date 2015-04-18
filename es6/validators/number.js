import {isNumber} from 'js-type-check';
import ef from 'simple-error-factory';
import getFields from './getFields';

const NumberError = ef('number');

const fields = [
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
    return new TypeError(`${val} is not ${schema.type.constructor.name}`);
  }

  // v === validator
  let result = getFields(fields, schema)
    .filter(v => !v.fn(val, v.val))
    .map(v => {
      return {
        failed: v.name,
        value: val,
        [v.name]: v.val
      }
    });

  return result.length === 0 ? doc : NumberError(result);

}
