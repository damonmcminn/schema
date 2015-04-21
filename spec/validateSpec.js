'use strict';
var validate = require('../lib/validate');
var isArray = require('js-type-check').isArray;
var tv = require('../lib/typeValidators');

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

  it('should optionally validate array elements', function() {

    let validators = tv.filter(function(v) {
      return v.type === 'array';
    });

    let schema = {
      field: 'xs',
      type: Array,
    };

    expect(validate(validators, schema, [])[0]).toBe(true);

    schema.elements = 'mixed';
    expect(validate(validators, schema, [1, 'str', true])[0]).toBe(true);

    schema.elements = String;
    expect(validate(validators, schema, [1, 'str', true])[0]).toBe(false);
    expect(validate(validators, schema, ['str', 'foo', 'bar'])[0]).toBe(true);

    schema.elements = Boolean;
    expect(validate(validators, schema, ['foo'])[0]).toBe(false);
    expect(validate(validators, schema, [true])[0]).toBe(true);

    schema.elements = Number;
    expect(validate(validators, schema, ['foo'])[0]).toBe(false);
    expect(validate(validators, schema, [1])[0]).toBe(true);

    schema.elements = RegExp;
    expect(validate(validators, schema, ['foo'])[0]).toBe(false);
    expect(validate(validators, schema, [/regex/])[0]).toBe(true);

    schema.elements = Date;
    expect(validate(validators, schema, [Date.now()])[0]).toBe(false);
    expect(validate(validators, schema, [new Date()])[0]).toBe(true);

    schema.elements = Array;
    expect(validate(validators, schema, [Date.now()])[0]).toBe(false);
    expect(validate(validators, schema, [[1, 'str', true]])[0]).toBe(true);

    schema.elements = Function;
    expect(validate(validators, schema, [Date.now()])[0]).toBe(false);
    expect(validate(validators, schema, [function(){}])[0]).toBe(true);

    schema.elements = Object;
    expect(validate(validators, schema, ['str'])[0]).toBe(false);
    expect(validate(validators, schema, [{}, {foo: 'bar'}])[0]).toBe(true);

  });


});
