'use strict';
var n = require('../index.js');

describe('createSchemaValidator', function() {

  it('should return a function', function() {
  
    expect(n([{field: 'foo', type: String}])).toEqual(jasmine.any(Function)); 

  });

  it('should throw SchemaError if passed no schema objects', function() {
    let err = (function() {try {n([{}])}catch(e) {return e}})();
    expect(err.name).toBe('SchemaError');
    expect(err.message).toBe('Schema objects cannot be empty');

  });

  it('should throw SchemaError if schema objects missing `field` or `type`', function() {
    let noField = (function() {try {n([{type: Date}])}catch(e) {return e}})();
    let noType = (function() {try {n([{field: 'bar'}])}catch(e) {return e}})();
    let neither = (function() {try {n([{foo: 'bar'}])}catch(e) {return e}})();

    expect(noField.message).toBe('Missing field from schema object');
    expect(noType.message).toBe('Missing type from schema object');
    expect(neither.message).toBe('Missing field and type from schema object');

    expect(noField.schema.pop().type.now()).toEqual(jasmine.any(Number));
    expect(noType.schema.pop().field).toBe('bar');
    expect(neither.schema.pop().foo).toBe('bar');

  });

  describe('returned fn', function() {

    let schema = n([
      {
        field: 'num',
        type: Number,
        required: true
      },
    ]);

    it('should return ValidationError if object does not match schema', function() {

      expect(schema({num: 'string'}).message).toBe('num should be Number not String');

    });

    it('should return ValidationError if fields not present in schema', function() {

      let doc = {
        num: 1,
        foo: []
      };

      expect(schema(doc).message).toBe('foo not present in schema');

    });

    it('should return ValidationError if input is not an object or an empty object', function() {

      expect(schema().message).toBe('Invalid document');
      expect(schema([]).message).toBe('Invalid document');
      expect(schema({}).message).toBe('Invalid document');

    });

    it('should return ValidationError if required field not present', function() {

      let validate = n([
        {
          field: 'foo',
          type: Boolean,
          required: true
        },
        {
          field: 'bar',
          type: String,
          default: 'bar'
        }
      ]);

      expect(validate({bar: 'foo'}).message).toBe('foo is a required field');

    });

    it('should correctly validate types', function() {

      let validate = n([
        {
          field: 'bool',
          type: Boolean,
        },
        {
          field: 'date',
          type: Date,
        },
        {
          field: 'str',
          type: String
        },
        {
          field: 'obj',
          type: Object,
        },
        {
          field: 'list',
          type: Array,
        },
        {
          field: 'num',
          type: Number
        }
      ]);

      let doc = {
        bool: true,
        date: new Date(),
        str: 'string',
        obj: {},
        list: [],
        num: -56.8
      };

      expect(validate(doc)).toBe(doc);

    });

    it('should return doc with defaults', function() {

      let validate = n([
        {
          field: 'foo',
          type: String,
          default: 'foo'
        },
        {
          field: 'num',
          type: Number
        }
      ]);

      expect(validate({num: 88}).foo).toBe('foo');
      expect(validate({num: 88, foo: 'bar'}).foo).toBe('bar');

    });

  });

});
