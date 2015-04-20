import {isArray, isObject} from 'js-type-check';
import ErrorFactory from 'simple-error-factory';

const SchemaError = ErrorFactory('schema');

export default function validateSchema(schema) {
  /**
   * Expects [schema1, schema2, ...]
   * where schema is in form {type, field, ...}
   * anything else will throw an error
   */


  if (!isArray(schema)) {
    throw new TypeError;
  }

  let notObjects = schema.filter(s => isObject(s)).length !== schema.length;

  if (notObjects) {
    throw new TypeError;
  }

  // type and field required
  // either required OR default, not both
  let invalid = schema.filter(s => {
    return (s.type && s.field) && !(s.required && s.default);
  }).length !== schema.length;

  if (invalid || schema.length === 0) {
    throw SchemaError('Invalid schema');
  }

  return true;
}
