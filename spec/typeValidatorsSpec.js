'use strict';

const tv = require('../lib/typeValidators');

describe('typeValidators', function() {

  it('should validate each type correctly', function() {

    let validators = tv.filter(function(v) {
      return v.name === 'type';
    });

    let types = [
      {t: 'number', v: 1},
      {t: 'string', v: 'str'},
      {t: 'boolean', v: true},
      {t: 'regexp', v: /regex/},
      {t: 'date', v: new Date()},
      {t: 'array', v: []},
      {t: 'function', v: function() {}},
      {t: 'object', v: {}}
    ];

    types.forEach(function(type) {
      let validator = validators.reduce(function(prev, curr) {
        return prev.type === type.t ? prev : curr;
      });

      expect(validator.fn(type.v)).toBe(true);

    });

  });

});
