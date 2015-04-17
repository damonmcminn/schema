const fields = [
  'min',
  'max',
  'fake'
];

export default function(schema, doc) {
  
  let val = doc[schema.field];

  /**
   * type can be validated in here
  console.log(val.constructor.name);
  console.log(schema.type);
  **/

  // main.js
  let xs = fields.map(x => {
    return {
      [x]: schema[x],
      name: x
    };
  }).filter(x => x[x.name]);





  return xs;

}
