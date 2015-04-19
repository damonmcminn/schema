'use strict';
var main = require('../../lib/validators/main');

describe('validators/main', function() {

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
  
  it('should return a triplet [valid, val, failures]', function() {

    let schema = {
      field: 'num',
      min: 1,
      max: 9
    };

    let pass = main([min], schema, 2);
    let fail = main([min, max], schema, 99);

    let noValidators = main([], schema, 10);

    expect(pass[0]).toBe(true);
    expect(fail[0]).toBe(false);

    expect(fail[2][0].validator).toBe('max');

    expect(noValidators[0]).toBe(true);
    expect(noValidators[1]).toBe(10);

  });

  it('should ignore undeclared validators', function() {

    let schema = {
      field: 'num'
    };
    
    let result = main([{name: 'min', fn: function() {}}], schema, 99);
    expect(result[0]).toBe(true);
    expect(result[1]).toBe(99);
    expect(result[2].length).toBe(0);

  });


});
