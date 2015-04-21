import validateSchema from './validateSchema';
import addValidators from './addValidators';
import validate from './validate';
import ef from 'simple-error-factory';
import {isDefined} from 'js-type-check';
import {find} from 'ramda';

const ValidationError = ef('validation');

export default function createSchema(schema, additionalValidators) {
  /**
   * @param {Array} schema - list of {type,field}
   * @param {Array} validators - OPTIONAL list of {type,name,fn}
   * @returns {function} fn(obj) => matches schema
   */

  // throws if schema or additional validators invalid
  validateSchema(schema);
  const schemaValidators = addValidators(additionalValidators);

  schema.forEach(s => {
    s.validator = s.type.prototype.constructor.name.toLowerCase();
  });

  let required = schema.filter(s => s.required).map(s => s.field);
  let defaults = schema.filter(s => s.default).map(s => s.field);
  let fields = schema.map(s => s.field);

  return function(obj, update) {

    let missing = required.filter(r => obj[r]).length !== required.length;

    if (missing && !update) {
      return ValidationError('Missing a required field');
    }

    let keys = Object.keys(obj);
    let invalidKeys = keys.filter(prop => {
      // undefined if not found
      return !find(field => field === prop, fields);
    });

    if (invalidKeys.length > 0) {
      return ValidationError(`Invalid fields(s): ${invalidKeys}`);
    }

    let failed = [];
    schema.forEach(s => {

      let val = obj[s.field];

      // only validate a field with a value
      if (isDefined(val)) {

        let validators = schemaValidators.filter(v => v.type === s.validator);
        let [valid, failures] = validate(validators, s, val);
        
        failures.forEach(failure => failed.push(failure));
      } else if (s.default) {
        obj[s.field] = s.default;
      }

    });
    
    let err = ValidationError('Failed validation', {failed});

    return failed.length > 0 ? err : obj;

  }

}
