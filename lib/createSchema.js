'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } };

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = createSchema;

var _validateSchema = require('./validateSchema');

var _validateSchema2 = _interopRequireWildcard(_validateSchema);

var _addValidators = require('./addValidators');

var _addValidators2 = _interopRequireWildcard(_addValidators);

var _validate3 = require('./validate');

var _validate4 = _interopRequireWildcard(_validate3);

var _ef = require('simple-error-factory');

var _ef2 = _interopRequireWildcard(_ef);

var _isDefined = require('js-type-check');

var _find = require('ramda');

var ValidationError = _ef2['default']('validation');

function createSchema(schema, additionalValidators) {
  /**
   * @param {Array} schema - list of {type,field}
   * @param {Array} validators - OPTIONAL list of {type,name,fn}
   * @returns {function} fn(obj) => matches schema
   */

  // throws if schema or additional validators invalid
  _validateSchema2['default'](schema);
  var schemaValidators = _addValidators2['default'](additionalValidators);

  schema.forEach(function (s) {
    s.validator = s.type.prototype.constructor.name.toLowerCase();
  });

  var required = schema.filter(function (s) {
    return s.required;
  }).map(function (s) {
    return s.field;
  });
  var defaults = schema.filter(function (s) {
    return s['default'];
  }).map(function (s) {
    return s.field;
  });
  var fields = schema.map(function (s) {
    return s.field;
  });

  return function (obj, update) {

    var missing = required.filter(function (r) {
      return obj[r];
    }).length !== required.length;

    if (missing && !update) {
      return ValidationError('Missing a required field');
    }

    var keys = Object.keys(obj);
    var invalidKeys = keys.filter(function (prop) {
      // undefined if not found
      return !_find.find(function (field) {
        return field === prop;
      }, fields);
    });

    if (invalidKeys.length > 0) {
      return ValidationError('Invalid fields(s): ' + invalidKeys);
    }

    var failed = [];
    schema.forEach(function (s) {

      var val = obj[s.field];

      // only validate a field with a value
      if (_isDefined.isDefined(val)) {

        var validators = schemaValidators.filter(function (v) {
          return v.type === s.validator;
        });

        var _validate = _validate4['default'](validators, s, val);

        var _validate2 = _slicedToArray(_validate, 2);

        var valid = _validate2[0];
        var failures = _validate2[1];

        failures.forEach(function (failure) {
          return failed.push(failure);
        });
      } else if (s['default']) {
        obj[s.field] = s['default'];
      }
    });

    var err = ValidationError('Failed validation', { failed: failed });

    return failed.length > 0 ? err : obj;
  };
}

module.exports = exports['default'];
//# sourceMappingURL=createSchema.js.map