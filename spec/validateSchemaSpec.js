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
    expect(fn([])).toThrowError(TypeError);
    expect(fn([{}])).toThrowError(TypeError);
    expect(fn([1])).toThrowError(TypeError);
    expect(fn([invalid])).toThrowError(TypeError);
    expect(fn([[]])).toThrowError(TypeError);
    expect(fn(1)).toThrowError(TypeError);
    expect(fn([null])).toThrowError(TypeError);

  });

});
