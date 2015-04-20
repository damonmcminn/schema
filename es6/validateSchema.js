import {isArray, isObject} from 'js-type-check';
import ErrorFactory from 'simple-error-factory';
import R from 'ramda';

const SchemaError = ErrorFactory('schema');

export default function validateSchema(schema) {
  /**
   * Expects [schema1, schema2, ...]
   * where schema is in form {type, field, ...}
   * anything else will throw an error
   */

  let err = new TypeError('Invalid schema');

  if (!isArray(schema)) {
    throw err;
  }

  let valid = schema.filter(s => s.type && s.field).length === schema.length;

  if (!valid || schema.length === 0) {
    throw err;
  }

  return true;
}
