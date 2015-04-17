import v from 'validate.js';
import ErrorFactory from 'simple-error-factory';
import R from 'ramda';

import {install} from 'source-map-support';
install();

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

  let stringValidators = ['min', 'max'];
  // now add validators to extra validation list e.g. min,max


  let find = function(field) {
    return R.find(R.propEq('field', field), typedSchema);
  };

  let error = null;

  let required = typedSchema.filter(x => x.required)
    .map(x => x.field);

  let defaults = typedSchema.filter(x => x.default);

  return function(doc) {

    if (!doc || !v.isObject(doc) || Object.keys(doc).length === 0) {
      return ValidationError(`Invalid document`);
    }

    let keys = Object.keys(doc);
    let d = keys.map(key => [key, doc[key]]);

    for (let [key, val] of d) {

      let fieldSchema = find(key);
      let valType = val.constructor.name; // what if custom constructor?
      let fieldType = fieldSchema ? fieldSchema.type: null;

      if (!fieldSchema) {
        error = `${key} not present in schema`;
      } else if (valType !== fieldType) {
        error = `${key} should be ${fieldType} not ${valType}`;
      }
    }

    required.forEach(function(r) {
      if (keys.indexOf(r) === -1) {
        error = `${r} is a required field`;
      }
    });

    defaults.forEach(function(d) {
      if (!doc[d.field]) {
        doc[d.field] = d.default;
      }
    });

    return error ? ValidationError(error, {typedSchema}) : doc;
  }
}
