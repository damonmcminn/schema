export default function(fields, schema) {

  /**
   * field: {name, fn}
   * schema: {field, type, ....}
   */

  return fields.filter(field => schema[field.name])
    .map(field => {
      return {
        name: field.name,
        val: schema[field.name],
        fn: field.fn
      }
    });
}
