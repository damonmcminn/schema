import * as tc from 'js-type-check';

export default {

  number: [
    {
      name: 'type',
      fn: function(val) {
        return tc.isNumber(val);
      }
    },
    {
      name: 'min',
      fn: function(x, min) {
        return x >= min;
      }
    },
    {
      name: 'max',
      fn: function(x, max) {
        return x <= max;
      }
    }
  ],
  string: [],
  boolean: [],
  date: [],
  regexp: [],
  array: [],
  object: [], // ??

}
