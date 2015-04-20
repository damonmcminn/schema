'use strict';

const cs = require('../lib/createSchema');

describe('createSchema', function() {

  it('should return a function', function() {

    expect(cs([{type: Boolean, field: 'valid'}])).toEqual(jasmine.any(Function));

  });

  it('should a validate an object according to the schema', function() {

    let schema = [
      {type: Number, field: 'num'},
      {type: String, field: 'str'},
      {type: Boolean, field: 'bool'},
      {type: RegExp, field: 'regex'},
      {type: Date, field: 'date'},
      {type: Array, field: 'list'},
      {type: Function, field: 'fn'},
      {type: Object, field: 'obj'}
    ];
    
    schema.forEach(function(s) {
      s.required = true;
    });

    let validate = cs(schema);

    let missing = {num: 1};
    expect(validate(missing).name).toBe('ValidationError');

  });

});
