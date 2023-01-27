import { React, useContext, useEffect } from "react"
import KoshContext from "./KoshContext"
import LanguageContext from "../Website/LanguageContext"
import CustomSelect from "./CustomSelect"
import CustomMultiSelect from "./CustomMultiSelect"
import fetchKosh from "./fetchKosh"

const KoshQueryParams = () => {
  const {
    state,
    base_url,
    spec_url,
    setDictBaseUrl,
    dict_ids, setDictId,
    dict_fields, setDictFields,
    selected_field, setField,
    search_fields, setFields,
    query_types, setQueryTypes,
    query_type, setQueryType,
    query_size, setQuerySize,
    query_string, setQuery,
    setDisplayFields,
    setLoading,
    setResults
  } = useContext(KoshContext)

  const makeRequest = (value) => {
    setLoading(true)

    for (let id in dict_ids) {
      const url = base_url + state.dict_collection.base_path + "/" + dict_ids[id] + "/graphql"

      setDictBaseUrl(prevUrl => ({
        ...prevUrl,
        [dict_ids[id]]: url
      }))

      // Get entries matching query
      if (dict_fields[dict_ids[id]].includes(selected_field)) {
        fetchKosh(url, `
          query SearchResultsQuery {
                entries(queryType: ${query_type}, query: "${value}", field: ${selected_field}, size: ${query_size}) {
                  ${dict_fields[dict_ids[id]]}
                }
              }
        `).then(response => {
          const entries = response.data.entries

          setResults(prevResults => ({
            ...prevResults,
            [dict_ids[id]]: entries
          }))
        })
      }
      else {
        setResults(prevResults => ({
          ...prevResults,
          [dict_ids[id]]: ""
        }))
      }
    }

    setLoading(false)
  }

  const language = useContext(LanguageContext)

  const selectedField = (e) => {
    setField(e.target.value)
  }

  const selectedQueryType = (e) => {
    setQueryType(e.target.value)
  }

  const selectedQuerySize = (e) => {
    setQuerySize(e.target.value)
  }

  const selectedDictIds = (e) => {
    if (!dict_ids.includes(e.target.id)) {
      setDictId(prevIds => [...prevIds, e.target.id])
    }
    else {
      setDictId(prevIds => prevIds.filter(id => id !== e.target.id))
      setResults(prevResults => ({
        ...prevResults,
        [e.target.id]: ""
      }))
    }
  }

  const selectedQuery = (e) => {
    if (e.target.value !== "") {
      setQuery(e.target.value)
      makeRequest(e.target.value)
    }
    else {
      setQuery("")
      setResults("")
    }
  }

  const submitQuery = () => {
    if (query_string !== "") {
      setQuery(query_string)
      makeRequest(query_string)
    }
    else {
      setQuery("")
      setResults("")
    }
  }

  useEffect(() => {
    setLoading(true)
    let isMounted = true
    let available_fields = []

    // Get available search and display fields for all dictionaries
    for (let id in state.mpcd_ids) {
      const url = base_url + state.dict_collection.base_path + "/" + state.mpcd_ids[id] + "/graphql"

      fetchKosh(url, `
          query SearchFieldsQuery {
                __type(name: "${state.mpcd_ids[id]}") {
                  fields {
                    name
                    }
                  }
                }
        `).then(response => {
        const res = response.data
        const fields = res["__type"]["fields"]?.map(i => i.name).filter(i => i !== "created")

        fields.forEach(field => {
          if (!available_fields.includes(field)) {
            available_fields.push(field)
          }
        })

        // Fields which are available in the search and as columns in the table
        setFields(available_fields)
        setDisplayFields(Object.assign({}, ...available_fields.map(field => ((field === "id" || field === "xml") ? { [field]: false } : { [field]: true }))))
        // Fields available per dictionary
        setDictFields(prevFields => ({
          ...prevFields,
          [state.mpcd_ids[id]]: fields
        }))
      })
    }

    // Get all available query types
    fetchKosh(spec_url, `
      query QueryTypesQuery {
            __type(name: "querytypes") {
              enumValues {
                name
              }
            }
          }
    `).then(response => {
      if (!isMounted) { return }
      const res = response.data
      const types = res["__type"]["enumValues"].map(i => i.name)
      setQueryTypes(types)
    })

    setLoading(false)
    return () => { isMounted = false }
  }, [base_url, state.dict_collection.base_path, state.mpcd_ids, setDictFields, spec_url, setFields, setQueryTypes, setLoading, setDisplayFields])

  return (
    <div className="flex flex-row pt-2">
      <div className="flex flex-col flex-wrap px-1 m-2">
        <nav className="flex flex-row">
          <CustomMultiSelect
            fields={state.mpcd_ids}
            label={language.language.lang === "english" ? "Dictionaries: " : "Wörterbücher: "}
            preselected={dict_ids}
            onc={selectedDictIds}
          />
        </nav>
        <nav className="flex flex-row mt-4">
          <CustomSelect
            fields={search_fields}
            label={language.language.lang === "english" ? "Field: " : "Anfragefeld: "}
            preselected={selected_field}
            onc={selectedField}
          />
          <CustomSelect
            fields={query_types}
            label={language.language.lang === "english" ? "Query Type: " : "Anfragetyp: "}
            preselected={query_type}
            onc={selectedQueryType}
          />
          <CustomSelect
            fields={state.search.query_sizes}
            label={language.language.lang === "english" ? "Query Size: " : "Anfrageumfang: "}
            preselected={query_size}
            onc={selectedQuerySize}
          />
        </nav>
        <div className="flex flex-row mt-4">
          <input
            id="query"
            name="query"
            autoComplete="query"
            type="text"
            className="sticky outline outline-1 outline-slate-400 rounded focus:border-blue-500 focus:ring focus:outline-none"
            placeholder={language.language.lang === "english" ? "Search for..." : "Suche nach..."}
            onChange={selectedQuery}
          />
          <input
            type="submit"
            value={language.language.lang === "english" ? "Search" : "Suchen"}
            onClick={submitQuery}
            className="ml-2 outline outline-1 outline-green-600 text-green-600 rounded hover:text-white hover:bg-green-600 transition easy-in-out cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}

export default KoshQueryParams