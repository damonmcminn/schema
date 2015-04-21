"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = validate;

function validate(validators, schema, val) {

  /**
   * validator: {name, fn}
   * schema: {field, type, ....}
   */

  var failed = validators.filter(function (validator) {
    return schema[validator.name];
  }).map(function (validator) {
    return {
      name: validator.name,
      val: schema[validator.name],
      fn: validator.fn
    };
  }).filter(function (validator) {
    return !validator.fn(val, validator.val);
  }).map(function (validator) {
    return {
      validator: validator.name,
      validatorVal: validator.val,
      actualVal: val
    };
  });

  // always at least one validator (type)
  var valid = failed.length === 0 && validators.length > 0;

  return [valid, failed];
}

module.exports = exports["default"];
//# sourceMappingURL=validate.js.map