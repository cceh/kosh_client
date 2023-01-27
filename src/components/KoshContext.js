import { createContext } from "react"

const stateStore = {

  mpcd_ids: ["awn", "cpd", "dmx", "gbd", "gpv", "lfv", "mmp", "nmp", "pyv", "sns", "wz"],

  search: {
    entries: {},
    loading: false,
    value: "",
    field: "trc",
    fields: [],
    query: [],
    query_types: [],
    query_type: "wildcard",
    query_size: 20,
    query_sizes: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
  },

  dict_collection: {
    base_path: "mpcd",
    dict_ids: [],
    dict_id: [],
    dict_fields: {},
    dict_base_url: ""
  },

  view: {
    table: true,
    value: ""
  },

  views: [
    { name: "TableView", value: "table" }
  ],

  dict_spec: {
    raw: null
  },

  results: {
    display_fields: {}
  }

}

const KoshContext = createContext(stateStore)

export default KoshContext