export default function(fields, schema, val) {

  /**
   * field: {name, fn}
   * schema: {field, type, ....}
   */

  let failures = fields.filter(field => schema[field.name])
    .map(field => {
      return {
        name: field.name,
        val: schema[field.name],
        fn: field.fn
      }
    })
    .filter(validator => !validator.fn(val, validator.val))
    .map(validator => {
      return {
        validator: validator.name,
        value: validator.val
      }
    });

  let valid = failures.length === 0;

  return [valid, val, failures];
}
