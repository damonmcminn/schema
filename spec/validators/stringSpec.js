'use strict';

const str = require('../../lib/validators/string');

describe('validators/string', function() {

  it('should return TypeError if given wrong schema type', function() {

    // has been converted to typed schema
    let schema = {
      field: 'num',
      type: 'Number',
    };

    let doc = {
      num: 8
    }

    expect(str(schema, doc).name).toBe('TypeError');

  });

  it('should return true if value validates', function() {

    let schema = {
      field: 'foo',
      type: 'String',
    };

    expect(str(schema, {foo: 'bar'})).toBe(true);

  });

});
