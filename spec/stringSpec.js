'use strict';

const str = require('../lib/validators/string');

describe('validators/string', function() {

  it('should return true if all validators pass', function() {

    // has been converted to typed schema
    let schema = {
      field: 'num',
      type: 'Number',
      min: 1,
      max: 9
    };

    let doc = {
      num: 8
    }

    expect(str(schema, doc)).toBe(true);

  });

});
