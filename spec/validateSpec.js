'use strict';
var validate = require('../lib/validate');

describe('validate', function() {

  let min = {
    name: 'min',
    fn: function(x, min) {
      return x >= min;
    }
  };

  let max = {
    name: 'max',
    fn: function(x, max) {
      return x <= max
    }
  };
  
  it('should return a pair [valid, failures]', function() {

    let schema = {
      field: 'num',
      min: 1,
      max: 9
    };

    let pass = validate([min], schema, 2);
    let fail = validate([min, max], schema, 99);

    let noValidators = validate([], schema, 10);

    expect(pass[0]).toBe(true);
    expect(fail[0]).toBe(false);

    expect(fail[1][0].validator).toBe('max');

    // validators are required
    expect(noValidators[0]).toBe(false);

  });

  it('should ignore undeclared validators', function() {

    let schema = {
      field: 'num'
    };
    
    let result = validate([{name: 'min', fn: function() {}}], schema, 99);
    expect(result[0]).toBe(true);
    expect(result[1].length).toBe(0);

  });


});
