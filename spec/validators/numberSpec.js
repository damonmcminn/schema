'use strict';

var n = require('../../lib/validators/number');

describe('validators/number', function() {

  let schema = {
    field: 'num',
    type: Number,
    min: 8,
    max: 9
  };

  it('should return TypeError if val not a number', function() {

    expect(n(schema, {num: 'foo'}).name).toBe('TypeError');

  });

  it('should return NumberError if val fails number validation', function() {

    expect(n(schema, {num: 0}).name).toBe('NumberError');

  });
});
