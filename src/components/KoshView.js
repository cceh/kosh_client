import { React, useContext, useState } from "react"
import KoshContext from "./KoshContext"
import KoshQueryParams from "./KoshQueryParams"
import KoshResultParams from "./KoshResultParams"
import KoshResultRender from "./KoshResultRender"

const KoshView = () => {
  const state = useContext(KoshContext)
  state.dict_collection.dict_id = state.mpcd_ids
  
  const base_url = "https://kosh.uni-koeln.de/"
  const spec_url = base_url + state.dict_collection.base_path + `/mmp/graphql`
  const [dict_base_url, setDictBaseUrl] = useState(state.dict_collection.dict_base_url)

  const [dict_ids, setDictId] = useState(state.dict_collection.dict_id)
  const [dict_fields, setDictFields] = useState(state.dict_collection.dict_fields)
  const [selected_field, setField] = useState(state.search.field)
  const [search_fields, setFields] = useState(state.search.fields)
  
  const [query_types, setQueryTypes] = useState(state.search.query_types)
  const [query_type, setQueryType] = useState(state.search.query_type)
  const [query_size, setQuerySize] = useState(state.search.query_size)
  const [query_string, setQuery] = useState(state.search.value)

  const [display_fields, setDisplayFields] = useState(state.results.display_fields)
  const [view, setView] = useState(state.view.value)
  const [table, setTable] = useState(state.view.table)
  const [views, setViewName] = useState(state.views)
  const [loading, setLoading] = useState(state.search.loading)
  const [results, setResults] = useState(state.search.entries)

  const value = {
    state: state,
    base_url: base_url,
    spec_url: spec_url,
    dict_base_url, setDictBaseUrl,
    dict_ids, setDictId,
    dict_fields, setDictFields,
    selected_field, setField,
    search_fields, setFields,
    query_types, setQueryTypes,
    query_type, setQueryType,
    query_size, setQuerySize,
    query_string, setQuery,
    display_fields, setDisplayFields,
    view, setView,
    table, setTable,
    views, setViewName,
    loading, setLoading,
    results, setResults
  }

  return (
    <KoshContext.Provider value={value}>
        <div id="container">
          <div className="mr-4 ml-4 bg-slate-50 mt-4">
            <KoshQueryParams />
          </div>
          <div className="mr-4 ml-4 bg-slate-50 mt-4">
            <div className="flex flex-row m-2 pt-2">
              <h5 className="font-bold text-lg">Search Results</h5>
            </div>
            <KoshResultParams />
          </div>
          <div className="flex flex-row mt-6">
            <KoshResultRender />
          </div>
        </div>
    </KoshContext.Provider>
  )
}

export default KoshView