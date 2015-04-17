'use strict';

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: key == null || typeof Symbol == 'undefined' || key.constructor !== Symbol, configurable: true, writable: true }); };

Object.defineProperty(exports, '__esModule', {
  value: true
});
var fields = ['min', 'max', 'fake'];

exports['default'] = function (schema, doc) {

  var val = doc[schema.field];

  /**
   * type can be validated in here
  console.log(val.constructor.name);
  console.log(schema.type);
  **/

  // main.js
  var xs = fields.map(function (x) {
    var _ref;

    return (_ref = {}, _defineProperty(_ref, x, schema[x]), _defineProperty(_ref, 'name', x), _ref);
  }).filter(function (x) {
    return x[x.name];
  });

  return xs;
};

module.exports = exports['default'];
//# sourceMappingURL=string.js.map