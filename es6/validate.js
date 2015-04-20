export default function validate(validators, schema, val) {

  /**
   * validator: {name, fn}
   * schema: {field, type, ....}
   */

  let failed = validators.filter(validator => schema[validator.name])
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

  let valid = failed.length === 0 && validators.length > 0;

  return [valid, failed];
}
