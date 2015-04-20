'use strict';

const av = require('../lib/addValidators');
const fn = function() {};

describe('addValidators', function() {

  let additional = {
    type: Boolean,
    name: 'additional',
    fn: fn
  };

  it('should return a concatted list of validators', function() {

    let result = av([additional]);

    let first = result.shift();
    let last = result.pop();

    expect(first.name).toBe('type');
    expect(last.name).toBe('additional');
    expect(last.type).toBe('boolean');

  });

  it('should throw TypeError if parameters are malformed', function() {

    let notAnArray = function() {av(additional) };

    delete additional.type;
    let malformed = function() {av(additional)};

    expect(notAnArray).toThrowError(TypeError);
    expect(malformed).toThrowError(TypeError);

  });

});
