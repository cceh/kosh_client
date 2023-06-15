'use client'

import { useContext, useEffect, useState } from "react";
import flatten from "../utils/flatten";
import fetchSpec from "../utils/fetchSpec";
import Context from "../data/Context";
import Footer from "../ui/Footer";
import QueryParams from "./QueryParams";
import ResultParams from "./ResultParams";
import ResultRender from "./ResultRender";

const View = () => {
  const state = useContext(Context);
  const collection_ids = state.collection_ids;
  const [kosh_api, setAPIEndpoint] = useState(state.kosh_api);

  const [query_string, setQueryString] = useState(state.search.value);
  const [query_dicts, setQueryDicts] = useState(state.search.dicts);
  const [query_field, setQueryField] = useState(state.search.field);
  const [query_type, setQueryType] = useState(state.search.query_type);
  const [query_size, setQuerySize] = useState(state.search.query_size);
  const query_sizes = state.search.query_sizes;

  const [collection_id, setCollectionId] = useState(state.collection.id);
  const [collection_base_path, setCollectionBasePath] = useState(
    state.collection.base_path
  );
  const [dict_specs, setAvailableDicts] = useState(state.collection.dicts);
  const [dict_ids, setDictIds] = useState(state.collection.dict_ids);
  const [dict_fields, setDictFields] = useState(state.collection.dict_fields);
  const [dict_types, setQueryTypes] = useState(state.collection.types);
  const [dict_base_urls, setDictBaseURLs] = useState(
    state.collection.dict_base_urls
  );

  const [display_fields, setDisplayFields] = useState(
    state.results.display_fields
  );
  const [loading, setLoading] = useState(state.results.loading);
  const [results, setResults] = useState(state.results.entries);

  const value = {
    collection_ids,
    kosh_api,
    setAPIEndpoint,
    query_dicts,
    setQueryDicts,
    query_string,
    setQueryString,
    query_field,
    setQueryField,
    query_type,
    setQueryType,
    query_size,
    setQuerySize,
    query_sizes,
    collection_id,
    setCollectionId,
    collection_base_path,
    setCollectionBasePath,
    dict_types,
    setQueryTypes,
    dict_specs,
    setAvailableDicts,
    dict_ids,
    setDictIds,
    dict_fields,
    setDictFields,
    dict_base_urls,
    setDictBaseURLs,
    display_fields,
    setDisplayFields,
    loading,
    setLoading,
    results,
    setResults,
  };

  useEffect(() => {
    const endpoint = kosh_api + "/" + collection_base_path;
    setLoading(true);

    const setSpec = async () => {
      const [dicts, fields, types, urls] = await fetchSpec(endpoint);
      const dicts_by_name = Object.keys(dicts);

      setAvailableDicts(dicts);
      setDictFields(flatten(fields));
      setQueryTypes(flatten(types));

      setDictIds(dicts_by_name);
      setQueryDicts(dicts_by_name.slice(0, 5));

      setDictBaseURLs(
        Object.assign(...dicts_by_name.map((k, i) => ({ [k]: urls[i] })))
      );

      setDisplayFields(
        Object.assign(
          ...flatten(fields).map((field) =>
            field === "id" || field === "xml"
              ? { [field]: false }
              : { [field]: true }
          )
        )
      );
    };

    setSpec();
    setLoading(false);
  }, [kosh_api, collection_base_path]);

  return (
    <Context.Provider value={value}>
      <div id="container">
        <div className="mr-4 ml-4 bg-slate-50 mt-4">
          <div className="flex flex-col flex-wrap pt-2">
            <a
              href="https://kosh.uni-koeln.de"
              className="inline-flex items-center"
            >
              <img
                src="/kosh.png"
                alt="kosh-logo"
                width="60px"
                height="60px"
                className="mr-4 ml-2"
              />
              Kosh - APIs for Lexical Data
            </a>
          </div>
          <QueryParams />
        </div>
        <div className="mr-4 ml-4 bg-slate-50 mt-4">
          <div className="flex flex-row m-2 pt-2">
            <h5 className="font-bold text-lg">Search Results</h5>
          </div>
          <ResultParams />
        </div>
        <div className="mr-4 ml-4 mt-4">
          <ResultRender />
        </div>
        <div className="mt-4 fixed bottom-0 w-full">
          <Footer />
        </div>
      </div>
    </Context.Provider>
  );
};

export default View;
