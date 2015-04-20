import * as tc from 'js-type-check';

export default [
  // NUMBER
  {
    type: 'number',
    name: 'type',
    fn: function(val) {
      return tc.isNumber(val);
    }
  },
  {
    type: 'number',
    name: 'min',
    fn: function(x, min) {
      return x >= min;
    }
  },
  {
    type: 'number',
    name: 'max',
    fn: function(x, max) {
      return x <= max;
    }
  },
  // STRING
  {
    type: 'string',
    name: 'type',
    fn: function(str) {
      return tc.isString(str);
    }
  },
  // BOOLEAN
  {
    type: 'boolean',
    name: 'type',
    fn: function(bool) {
      return tc.isBool(bool);
    }
  },
  // REGEXP
  {
    type: 'regexp',
    name: 'type',
    fn: function(regex) {
      return tc.isRegex(regex);
    }
  },
  // DATE
  {
    type: 'date',
    name: 'type',
    fn: function(date) {
      return tc.isDate(date);
    }
  },
  // FUNCTION
  {
    type: 'function',
    name: 'type',
    fn: function(fn) {
      return tc.isFunction(fn);
    }
  },
  // OBJECT
  {
    type: 'object',
    name: 'type',
    fn: function(obj) {
      return tc.isObject(obj);
    }
  },
  // ARRAY
  {
    type: 'array',
    name: 'type',
    fn: function(xs) {
      return tc.isArray(xs);
    }
  }
];
