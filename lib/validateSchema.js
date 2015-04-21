'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = validateSchema;

var _isArray$isObject = require('js-type-check');

var _ErrorFactory = require('simple-error-factory');

var _ErrorFactory2 = _interopRequireWildcard(_ErrorFactory);

var SchemaError = _ErrorFactory2['default']('schema');

function validateSchema(schema) {
  /**
   * Expects [schema1, schema2, ...]
   * where schema is in form {type, field, ...}
   * anything else will throw an error
   */

  if (!_isArray$isObject.isArray(schema)) {
    throw new TypeError();
  }

  var notObjects = schema.filter(function (s) {
    return _isArray$isObject.isObject(s);
  }).length !== schema.length;

  if (notObjects) {
    throw new TypeError();
  }

  // type and field required
  // either required OR default, not both
  var invalid = schema.filter(function (s) {
    return s.type && s.field && !(s.required && s['default']);
  }).length !== schema.length;

  if (invalid || schema.length === 0) {
    throw SchemaError('Invalid schema');
  }

  return true;
}

module.exports = exports['default'];
//# sourceMappingURL=validateSchema.js.map