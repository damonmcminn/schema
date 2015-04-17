export default function(fields, schema) {

  return fields.filter(field => schema[field])
    .map(field => {
      return {
        [field]: schema[field]
      }
    });
}
