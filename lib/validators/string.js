'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _getFields = require('./getFields');

var _getFields2 = _interopRequireWildcard(_getFields);

var _ErrorFactory = require('simple-error-factory');

var _ErrorFactory2 = _interopRequireWildcard(_ErrorFactory);

var _v = require('validate.js');

var _v2 = _interopRequireWildcard(_v);

var NumberError = _ErrorFactory2['default']('number');

// no fields as of yet
var fields = [];

exports['default'] = function (schema, doc) {

  var val = doc[schema.field];

  if (!_v2['default'].isString(val)) {
    return new TypeError('' + val + ' not ' + schema.type);
  }

  return true;
};

module.exports = exports['default'];
//# sourceMappingURL=string.js.map