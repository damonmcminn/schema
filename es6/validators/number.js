import v from 'validate.js';

const fields = ['min', 'max'];

export default (schema, doc) => {

  let val = doc[schema.field];

  if (!v.isNumber(val)) {
    var err = new TypeError(`${val} is not ${schema.type}`);
    console.log(err);
  }

}
