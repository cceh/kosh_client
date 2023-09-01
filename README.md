# Kosh Client

React app to query and display lexical data served by [Kosh](https://kosh.uni-koeln.de). 

This tool is in active development and may need some adjustments if you want to use it on your own data. If you're considering using Kosh and this client, feel free to reach out via [info-kosh@uni-koeln.de](mailto:info-kosh@uni-koeln.de).

A demo instance is available at: <https://dicts.uni-koeln.de>  
The default data is served from: <https://kosh.uni-koeln.de/api>

## Deployment

Making sure to change your working directory to the root of this repo, run the following commands to deploy the Kosh client.

### Using NPM
```sh
npm install
npm run build
```

### Using Docker
You can build and run the client with Docker using the provided [Dockerfile](./Dockerfile).
```sh
docker build -t kosh/client .
docker run -d -p 3000:80 --name kosh.client kosh/client
```

## Configuration
The configuration of the Kosh client is mainly handled from the [context file](./src/data/Context.js). Below you will find a list of values you could or should change to your liking.

If you plan on using this tool in production, you also need to update the list of collections in the [CollectionSwitcher component](./src/components/CollectionSwitcher.js). This is **not** necessary when serving Kosh locally at [localhost:5000](http://localhost:5000).

> **Note**
> Changing any values other than those listed here may currently lead to a broken build.

```js
const stateStore = {
  /* API base URL (without trailing slash) */
  kosh_api: "https://kosh.uni-koeln.de",
  
  /* List of available collections */
  collection_ids: [
    "First collection",
    "Second collection",
  ],

  /* Search parameters */
  search: {
    // Default dictionaries
    dicts: ["de_alcedo"],
    // Default field to be searched
    field: "lemma",
    // Default query type
    query_type: "prefix",
    // Default query size
    query_size: 20,
    // Available query sizes
    query_sizes: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  },

  /* Collection metadata */
  collection: {
    // Default collection to search
    id: "Kosh Data",
    // Default endpoint (e.g. https://kosh.uni-koeln.de/api)
    base_path: "api",
    // Dictionary IDs to exclude, these will not show up in the client
    exclude: ["cpd", "mmp"],
  },
};
```

## Development
If you want to contribute to this project, use NPM to get hot reloads on code changes:
```sh
npm install
npm start
```