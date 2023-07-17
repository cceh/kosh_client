import { createContext } from "react";

const stateStore = {
  kosh_api: "https://kosh.uni-koeln.de", // API base url
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
    value: "", // Query string
    query: "", // Query URL
    dicts: ["de_alcedo"], // Active dictionary
    field: "lemma", // Active field to be searched
    query_type: "prefix", // Active query type
    query_size: 20, // Active query size
    query_sizes: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], // Available query sizes
  },

  collection: {
    id: "Kosh Data", // Default collection to search
    base_path: "api", // Default endpoint
    dicts: [], // All dictionary objects
    dict_base_urls: {}, // All base REST/GraphQL URLs for all dictionaries
    dict_ids: [], // All available dictionaries in collection
    dict_fields: ["lemma", "sense"], // All available fields for all dictionaries
    dict_types: [], // All available query types for all dictionaries
    exclude: ["cpd", "mmp", "nmp"], // Which dictionary IDs to exclude
  },

  results: {
    loading: false, // Loading results or not?
    display_fields: {}, // Which fields to display in the table
    entries: {}, // All result entries
  },
};

const Context = createContext(stateStore);

export default Context;
