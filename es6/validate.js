export default function(validators, schema, val) {

  /**
   * validator: {name, fn}
   * schema: {field, type, ....}
   */

  let failures = validators.filter(validator => schema[validator.name])
    .map(validator => {
      return {
        name: validator.name,
        val: schema[validator.name],
        fn: validator.fn
      }
    })
    .filter(validator => !validator.fn(val, validator.val))
    .map(validator => {
      return {
        validator: validator.name,
        validatorVal: validator.val,
        actualVal: val
      }
    });

  let valid = failures.length === 0;

  return [valid, failures];
}
