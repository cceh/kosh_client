import { useContext, useEffect, useState } from "react";
import Context from "../data/Context";
import flatten from "../utils/flatten";
import fetchResults from "../utils/fetchResults";
import Dropdown from "../ui/Dropdown";
import CheckboxList from "../ui/CheckboxList";
import CollectionSwitcher from "./CollectionSwitcher";

const QueryParams = () => {
  const {
    loading,
    kosh_api,
    dict_base_urls,
    dict_ids,
    query_dicts,
    dict_fields,
    query_field,
    dict_types,
    query_type,
    query_sizes,
    query_size,
    query_string,
    dict_specs,
    setQueryDicts,
    setQueryField,
    setQueryType,
    setQuerySize,
    setQueryString,
    setDictFields,
    setDisplayFields,
    setLoading,
    setResults,
  } = useContext(Context);

  const [available_fields, setAvailableFields] = useState({});

  const selectDicts = (e) => {
    if (!query_dicts.includes(e.target.id)) {
      setQueryDicts((prevIds) => [...prevIds, e.target.id]);
    } else {
      setQueryDicts((prevIds) => prevIds.filter((id) => id !== e.target.id));
      setResults((prevResults) => ({
        ...prevResults,
        [e.target.id]: "",
      }));
    }
  };

  const selectField = (e) => {
    setQueryField(e.target.value);
  };

  const selectQueryType = (e) => {
    setQueryType(e.target.value);
  };

  const selectQuerySize = (e) => {
    setQuerySize(e.target.value);
  };

  const selectQuery = (e) => {
    if (e.target.value !== "") {
      setQueryString(e.target.value);
    } else {
      setQueryString("");
    }
  };

  const submitQuery = async (e) => {
    if (query_string !== "" && loading === false) {
      e.preventDefault();
      e.stopPropagation()
      
      setLoading(true);

      fetchResults(
        kosh_api,
        dict_base_urls,
        query_dicts,
        query_field,
        query_type,
        query_size,
        query_string,
        dict_specs,
        setResults
      );

      setLoading(false);
    }
  };

  useEffect(() => {
    const fields = query_dicts
      .filter((dict) => Object.hasOwn(dict_fields, dict))
      .map((dict) => dict_fields[dict]);

    if (!loading && fields.length > 0) {
      setAvailableFields(flatten(Object.values(fields)));

      setDisplayFields(
        Object.assign(
          ...flatten(fields).map((field) =>
            field === "created" || field === "id" || field === "xml"
              ? { [field]: false }
              : { [field]: true }
          )
        )
      );
    }
  }, [loading, query_dicts, dict_fields, setDictFields, setDisplayFields]);

  return (
    <div id="query-parameters" className="mx-4 mt-2">
      <div className="flex flex-row">
        <CollectionSwitcher />
        <CheckboxList
          label="Dictionaries: "
          items={dict_ids}
          preselected={query_dicts}
          onChange={selectDicts}
        />
      </div>
      <div className="flex flex-row mt-4">
        <Dropdown
          label="Field: "
          items={available_fields}
          preselected={query_field}
          onChange={selectField}
        />
        <Dropdown
          label="Query Type: "
          items={dict_types ? flatten(Object.values(dict_types)) : {}}
          preselected={query_type}
          onChange={selectQueryType}
        />
        <Dropdown
          label="Query Size: "
          items={query_sizes}
          preselected={query_size}
          onChange={selectQuerySize}
        />
      </div>
      <div className="flex flex-row mt-4">
        <form onSubmit={submitQuery}>
          <input
            id="query"
            name="query"
            value={query_string}
            autoComplete="query"
            type="text"
            className="outline outline-1 outline-slate-400 rounded focus:border-blue-500 focus:ring focus:outline-none"
            placeholder="Search for..."
            onChange={selectQuery}
            required
          />
          <button
            type="submit"
            className="outline outline-1 outline-green-600 text-green-600 rounded hover:text-white hover:bg-green-600 transition easy-in-out cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default QueryParams;
