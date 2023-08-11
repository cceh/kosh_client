import { createContext } from "react";

const stateStore = {
  kosh_api: "https://kosh.uni-koeln.de",
  collection_ids: [
    "CDSD",
    "Creole",
    "Freedict",
    "Kosh Data",
    "MPCD Glossaries",
    "C-SALT Sanskrit",
    // "localhost",
  ],

  search: {
    value: "",
    query: "",
    dicts: ["de_alcedo"],
    field: "lemma",
    query_type: "prefix",
    query_size: 20,
    query_sizes: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  },

  collection: {
    id: "Kosh Data",
    base_path: "api",
    dicts: [],
    dict_base_urls: {},
    dict_ids: [],
    dict_fields: ["lemma", "sense"],
    dict_types: [],
    exclude: ["cpd", "mmp", "nmp"],
  },

  results: {
    loading: false,
    display_fields: {},
    entries: {},
    urls: {},
  },
};

const Context = createContext(stateStore);

export default Context;
