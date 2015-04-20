import validateSchema from './validateSchema';
import addValidators from './addValidators';
import validate from './validate';
import ef from 'simple-error-factory';

const ValidationError = ef('validation');

export default function createSchema(schema, additionalValidators) {
  /**
   * @param {Array} schema - list of {type,field}
   * @param {Array} validators - OPTIONAL list of {type,name,fn}
   * @returns {function} fn(obj) => matches schema
   */

  // throws if schema or additional validators invalid
  validateSchema(schema);
  const validators = addValidators(additionalValidators);

  schema.forEach(s => {
    s.validator = s.type.prototype.constructor.name.toLowerCase();
  });

  let required = schema.filter(s => s.required).map(s => s.field);
  let defaults = schema.filter(s => s.default).map(s => s.field);
  console.log(required);
  console.log(defaults);

  return function(obj, update) {

    let missing = required.filter(r => obj[r]).length !== required.length;

    if (missing) {
      return ValidationError('Missing a required field');
    }
    
  }

}
