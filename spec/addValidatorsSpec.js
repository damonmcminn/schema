'use strict';

const av = require('../lib/addValidators');
const fn = function() {};

describe('addValidators', function() {

  it('should return a concatted list of validators', function() {

    let additional = {
      type: 'number',
      name: 'additional',
      fn: fn
    };

    let result = av([additional]);

    let first = result[0].shift();
    let last = result[0].pop();

    expect(first.name).toBe('type');
    expect(last.name).toBe('additional');

  });

  it('should return [false, error] if parameters are malformed', function() {

    let additional = {foo: 'bar'};

    let result = av([additional]);
    
    expect(result[0]).toBe(false);
    expect(result[1].name).toBe('TypeError');

    expect(av()[0][0].name).toBe('type');
    expect(av([])[0][0].name).toBe('type');

    // input not an array
    expect(av(1)[0]).toBe(false);

  });

});
