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
  }
];
