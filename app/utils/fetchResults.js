export default async function fetchResults(
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
  await Promise.all(
    Object.values(query_dicts).map(async (dict) => {
      const endpoint = kosh_api + dict_base_urls[dict];
      const url = `${endpoint}/entries?field=${query_field}&query=${query_string}&query_type=${query_type}&size=${query_size}`;

      if (dict_specs[dict].properties?.includes(query_field)) {
        try {
          const response = await fetch(url, { cache: 'force-cache' });
          const result = await response.json();
          const entries = result.data.entries;
          setResults((prevResults) => ({
            ...prevResults,
            [dict]: entries,
          }));
        } catch (error) {
          console.error(error);
        }
      } else {
        setResults((prevResults) => ({
          ...prevResults,
          [dict]: [],
        }));
      }
    })
  );
}
