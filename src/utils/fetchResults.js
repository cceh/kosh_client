export default function fetchResults(
  kosh_api,
  dict_base_urls,
  query_dicts,
  query_field,
  query_type,
  query_size,
  query_string,
  dict_specs,
  setResults
) {
  const dicts = Object.values(query_dicts);

  dicts.forEach(async (dict) => {
    const endpoint = kosh_api + dict_base_urls[dict];
    const url = `${endpoint}/entries?field=${query_field}&query=${query_string}&query_type=${query_type}&size=${query_size}`;

    if (dict_specs[dict].properties?.includes(query_field)) {
      await fetch(url)
        .then((response) => response.json())
        .then((result) => {
          const entries = result.data.entries;

          setResults((prevResults) => ({
            ...prevResults,
            [dict]: entries,
          }));
        })
        .catch((error) => console.error(error));
    } else {
      setResults((prevResults) => ({
        ...prevResults,
        [dict]: [],
      }));
    }
  });
}
