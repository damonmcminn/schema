import {isNumber} from 'js-type-check';

const fields = ['min', 'max'];

export default (schema, doc) => {

  let val = doc[schema.field];

  if (!isNumber(val)) {
    var err = new TypeError(`${val} is not ${schema.type}`);
    console.log(err);
  }

}
