import getFields from './getFields';
import ErrorFactory from 'simple-error-factory';
import v from 'validate.js';

const NumberError = ErrorFactory('number');

// no fields as of yet
const fields = [];

export default function(schema, doc) {

  let val = doc[schema.field];

  if (!v.isString(val)) {
    return new TypeError(`${val} not ${schema.type}`);
  }

  return true;
}
