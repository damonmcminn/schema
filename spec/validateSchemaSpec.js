'use strict';

const validateSchema = require('../lib/validateSchema');
let fn = function(input) {
  return function() {
    validateSchema(input);
  };
};

describe('validateSchema', function() {

  it('should return throw TypeError if input not [{}, ...]', function() {

    let invalid = {foo: 'bar'};

    expect(fn()).toThrowError(TypeError);
    expect(fn([])).toThrow();
    expect(fn([{}])).toThrow();
    expect(fn([1])).toThrowError(TypeError);
    expect(fn([invalid])).toThrow();
    expect(fn([[]])).toThrowError(TypeError);
    expect(fn(1)).toThrowError(TypeError);
    expect(fn([null])).toThrowError(TypeError);

  });

});
