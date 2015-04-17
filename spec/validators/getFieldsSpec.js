'use strict';
var main = require('../../lib/validators/getFields');

describe('validators/main', function() {

  it('should return a list of field/value pairs to validate', function() {

    // has been converted to typed schema
    let schema = {
      field: 'num',
      type: 'Number',
      min: 1,
      max: 9
    };

    let doc = {
      num: 1
    };
    
    let result = main(['min'], schema, doc);
    let noFields = main([], schema, doc);
    expect(result.length).toBe(1);
    expect(result[0].min).toBe(1);
    expect(noFields.length).toBe(0);

  });

  it('should ignore undeclared fields', function() {

    // has been converted to typed schema
    let schema = {
      field: 'num',
      type: 'Number',
    };

    let doc = {
      num: 1
    };
    
    let result = main(['min', 'max'], schema, doc);
    expect(result.length).toBe(0);

  });


});
