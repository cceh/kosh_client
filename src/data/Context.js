import { createContext } from "react";

const stateStore = {
  kosh_api: "https://kosh.uni-koeln.de", // API base url
  collection_ids: [
    "CDSD",
    "Creole",
    "Freedict",
    "Kosh Data",
    "MPCD",
    "C-SALT Sanskrit",
    "localhost",
  ],

  search: {
    value: "", // String that's been input by the user
    query: "", // Query URL
    dicts: [],
    field: "lemma", // Active field to be searched
    query_type: "wildcard", // Active query type
    query_size: 20, // Active query size
    query_sizes: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], // All available query sizes
  },

  collection: {
    id: "mpcd",
    base_path: "api", // Default collection to search
    dicts: [],
    dict_base_urls: {}, // All base REST/GraphQL URLs for all dictionaries
    dict_ids: [], // All available dictionaries in collection
    dict_fields: {}, // All available fields for all dictionaries
    dict_types: [], // All available query types for all dictionaries
    exclude: ["cpd", "mmp", "nmp"],
  },

  results: {
    loading: false, // Loading results or not?
    display_fields: {}, // [search.field]: true or false
    entries: {}, // Actual entries I get back from the server
  },
};

const Context = createContext(stateStore);

export default Context;
