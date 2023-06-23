function extract(dicts, attribute) {
  return Object.assign(
    ...Object.entries(dicts).map(([dict, attributes]) => ({
      [dict]: attributes[attribute],
    }))
  );
}

export default function fetchSpec(endpoint) {
  return fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      const dicts = data["dicts"];
      const fields = extract(dicts, "properties");
      const types = extract(dicts, "query_types");
      const urls = Object.values(dicts).map((dict) => dict.endpoints.restful);
      // TODO: GraphQL/REST switch

      return [dicts, fields, types, urls];
    })
    .catch((error) => console.error(error));
}
