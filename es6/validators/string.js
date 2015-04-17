import getFields from './getFields';
import ErrorFactory from 'simple-error-factory';
import v from 'validate.js';

const NumberError = ErrorFactory('number');

const fields = ['min', 'max'];

export default function(schema, doc) {

  let val = doc[schema.field];

  if (!v.isString(val)) {
    return new TypeError(`${val} not ${schema.type}`);
  }
  
  let xs = main(fields, schema);
  console.log(xs);
  return xs;

}
