export default async function fetchSpec(endpoint) {
  try {
    const response = await fetch(endpoint, { cache: 'force-cache' });
    const data = await response.json();
    const dicts = data["dicts"];
    const fields = Object.values(dicts).map((dict) => dict.properties);
    const types = Object.values(dicts).map((dict) => dict.query_types);
    const urls = Object.values(dicts).map((dict) => dict.endpoints.restful);
    // TODO: GraphQL/REST switch

    return [dicts, fields, types, urls];
  } catch (error) {
    console.error(error);
  }
}
