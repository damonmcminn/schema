import validators from './validators';
import {isObject} from 'js-type-check';

export default function addValidator(additional) {

  if (isObject(additional)) {

    Object.keys(additional).forEach(type => {
      
      let original = validators[type];

      if (!original) {
        validators[type] = additional[type]
      } else {
        let added = validators[type].concat(additional[type]);
        validators[type] = added;
      }
    });

  }

  return validators;

}
