'use strict';

const cs = require('../lib/createSchema');

describe('createSchema', function() {

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
    
  it('should return a function', function() {

    expect(cs([{type: Boolean, field: 'valid'}])).toEqual(jasmine.any(Function));

  });

  it('should a validate an object according to the schema', function() {

    let required = schema.map(function(s) {
      return {
        type: s.type,
        field: s.field,
        required: true
      }
    });

    let missing = cs(required)({num: 1});
    let missingButIsUpdate = cs(required)({str: 'update'}, true);

    let fail = cs(schema)({num: 'wrong type'});
    let pass = cs(schema)({str: 'pass'});

    expect(missing.message).toBe('Missing a required field');
    expect(missingButIsUpdate.str).toBe('update');

    expect(fail.message).toBe('Failed validation');
    expect(fail.failed[0].validator).toBe('type');

    expect(pass.str).toBe('pass');

  });

  it('should set defaults if not supplied', function() {

    let defaults = schema.map(function(s) {
      return {
        type: s.type,
        field: s.field,
        default: 'default'
      }
    });

    let result = cs(defaults)({});

    for (let key in result) {
      expect(result[key]).toBe('default');
    }

  });

  it('should only set defaults if not supplied', function() {

    let schema = [
      {
        type: String,
        field: 'str',
        default: 'default'
      },
      {
        type: Boolean,
        field: 'defaulted',
        default: true
      }
    ];

    let result = cs(schema)({str: 'foo'});

    expect(result.str).toBe('foo');
    expect(result.defaulted).toBe(true);
    
  });

});
