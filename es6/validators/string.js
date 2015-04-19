import ErrorFactory from 'simple-error-factory';
import {isString} from 'js-type-check';
import validator from './main';

const StringError = ErrorFactory('string');

// no fields as of yet
const fields = [];

export default function(schema, doc) {

  let val = doc[schema.field];

  if (!isString(val)) {
    return new TypeError(`${val} not ${schema.type}`);
  }

  return true;
}
