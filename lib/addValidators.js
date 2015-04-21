'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = addValidators;

var _typeValidators = require('./typeValidators');

var _typeValidators2 = _interopRequireWildcard(_typeValidators);

var _import = require('js-type-check');

var tc = _interopRequireWildcard(_import);

function addValidators(additional) {

  var isArray = tc.isArray(additional);
  var isDefined = !tc.isUndefined(additional);
  var invalidObjects = undefined;
  var valid = undefined;

  if (isArray) {
    valid = additional.filter(function (x) {
      return !tc.isFunction(x.type) || !tc.isString(x.name) || !tc.isFunction(x.fn);
    }).length === 0;
  }

  if (!isDefined) {
    return _typeValidators2['default'];
  } else if (valid) {
    additional.forEach(function (a) {
      a.type = a.type.prototype.constructor.name.toLowerCase();
    });
    return _typeValidators2['default'].concat(additional);
  } else {
    throw new TypeError('A validator is not in form {type,name,fn}');
  }
}

module.exports = exports['default'];
//# sourceMappingURL=addValidators.js.map