'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } };

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = createSchemaValidator;

var _install = require('source-map-support');

var _v = require('validate.js');

var _v2 = _interopRequireWildcard(_v);

var _ErrorFactory = require('simple-error-factory');

var _ErrorFactory2 = _interopRequireWildcard(_ErrorFactory);

var _R = require('ramda');

var _R2 = _interopRequireWildcard(_R);

var _validators = require('./validators');

var _validators2 = _interopRequireWildcard(_validators);

_install.install();

var ValidationError = _ErrorFactory2['default']('validation');
var SchemaError = _ErrorFactory2['default']('schema');

function createSchemaValidator(schema) {

  if (!_v2['default'].isArray(schema)) {
    throw SchemaError('Array of schema objects is required');
  }

  var badSchema = undefined;
  schema.forEach(function (s) {
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
    throw SchemaError(badSchema, { schema: schema });
  }

  var typedSchema = schema.map(function (x) {
    x.type = x.type.name;
    return x;
  });

  var stringValidators = ['min', 'max'];
  // now add validators to extra validation list e.g. min,max

  var find = function find(field) {
    return _R2['default'].find(_R2['default'].propEq('field', field), typedSchema);
  };

  var error = null;

  var required = typedSchema.filter(function (x) {
    return x.required;
  }).map(function (x) {
    return x.field;
  });

  var defaults = typedSchema.filter(function (x) {
    return x['default'];
  });

  return function (doc) {

    if (!doc || !_v2['default'].isObject(doc) || Object.keys(doc).length === 0) {
      return ValidationError('Invalid document');
    }

    var keys = Object.keys(doc);
    var d = keys.map(function (key) {
      return [key, doc[key]];
    });

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = d[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _slicedToArray(_step.value, 2);

        var key = _step$value[0];
        var val = _step$value[1];

        var fieldSchema = find(key);
        var valType = val.constructor.name; // what if custom constructor?
        var fieldType = fieldSchema ? fieldSchema.type : null;

        if (!fieldSchema) {
          error = '' + key + ' not present in schema';
        } else if (valType !== fieldType) {
          error = '' + key + ' should be ' + fieldType + ' not ' + valType;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    required.forEach(function (r) {
      if (keys.indexOf(r) === -1) {
        error = '' + r + ' is a required field';
      }
    });

    defaults.forEach(function (d) {
      if (!doc[d.field]) {
        doc[d.field] = d['default'];
      }
    });

    return error ? ValidationError(error, { typedSchema: typedSchema }) : doc;
  };
}

module.exports = exports['default'];
//# sourceMappingURL=NoSQLSchema.js.map