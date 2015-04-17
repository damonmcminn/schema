'use strict';

var n = require('../../lib/validators/number');

describe('validators/number', function() {

  it('should return TypeError if val not a number', function() {

    let schema = {
      field: 'num',
      type: Number
    };

    expect(n(schema, {num: 'foo'}).name).toBe('TypeError');

  });

});
