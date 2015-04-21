'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _import = require('js-type-check');

var tc = _interopRequireWildcard(_import);

exports['default'] = [
// NUMBER
{
  type: 'number',
  name: 'type',
  fn: function fn(val) {
    return tc.isNumber(val);
  }
}, {
  type: 'number',
  name: 'min',
  fn: function fn(x, min) {
    return x >= min;
  }
}, {
  type: 'number',
  name: 'max',
  fn: function fn(x, max) {
    return x <= max;
  }
},
// STRING
{
  type: 'string',
  name: 'type',
  fn: function fn(str) {
    return tc.isString(str);
  }
},
// BOOLEAN
{
  type: 'boolean',
  name: 'type',
  fn: function fn(bool) {
    return tc.isBool(bool);
  }
},
// REGEXP
{
  type: 'regexp',
  name: 'type',
  fn: function fn(regex) {
    return tc.isRegex(regex);
  }
},
// DATE
{
  type: 'date',
  name: 'type',
  fn: function fn(date) {
    return tc.isDate(date);
  }
},
// FUNCTION
{
  type: 'function',
  name: 'type',
  fn: (function (_fn) {
    function fn(_x) {
      return _fn.apply(this, arguments);
    }

    fn.toString = function () {
      return _fn.toString();
    };

    return fn;
  })(function (fn) {
    return tc.isFunction(fn);
  })
},
// OBJECT
{
  type: 'object',
  name: 'type',
  fn: function fn(obj) {
    return tc.isObject(obj);
  }
},
// ARRAY
{
  type: 'array',
  name: 'type',
  fn: function fn(xs) {
    return tc.isArray(xs);
  }
}, {
  type: 'array',
  name: 'elements',
  fn: function fn(xs, type) {
    // if type === [schema...]?
    if (type === 'mixed') {
      return true;
    }

    return xs.filter(function (val) {
      return tc.typeCheck(type, val);
    }).length === xs.length;
  }
}];
module.exports = exports['default'];
//# sourceMappingURL=typeValidators.js.map