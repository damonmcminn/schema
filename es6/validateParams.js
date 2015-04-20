/*

import v from 'validate.js';
import ErrorFactory from 'simple-error-factory';
import R from 'ramda';
import validators from './validators';

const ValidationError = ErrorFactory('validation');
const SchemaError = ErrorFactory('schema');

export default function createSchemaValidator(schema) {

  if (!v.isArray(schema)) {
    throw SchemaError('Array of schema objects is required');
  }

  let badSchema;
  schema.forEach(s => {
    if (Object.keys(s).length === 0) {
      badSchema = 'Schema objects cannot be empty';
    } else if (!s.type && !s.field) {
      badSchema = 'Missing field and type from schema object';
    } else if (!s.type) {
      badSchema = 'Missing type from schema object';
    } else if (!s.field) {
      badSchema = 'Missing field from schema object';
    }
  });

  if (!!badSchema) {
    throw SchemaError(badSchema, {schema});
  }

  let typedSchema = schema.map(x => {
    x.type = x.type.name;
    return x;
  });
  */
