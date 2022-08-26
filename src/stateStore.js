import {store} from '@risingstack/react-easy-state';


const stateStore = store({

    collection_ids: ["mpcd"],


    mpcd_ids: ["awn","cpd", "dmx","gbd", "gpv", "mmp", "nmp", "pyv", "sns", "wz"],


    search: {
        entries: {},
        loading: false,
        value: "",
        field: "",
        fields: [],
        query: [],
        query_types: [],
        query_type: "",
        query_size: 10,
        query_sizes: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

    },

    dict_collection: {
        base_path: "",
        dict_ids: [],
        dict_id: [],
        dict_base_url: ""
    },

    view: {
        table: true,
        value: ''
    },

    views: [
        {name: 'TableView', value: 'table'},
        {name: 'CardView', value: 'card'},
    ],

    dict_spec: {
        raw: null
    },

    results: {
        display_fields: {}
    }


})

export default stateStore;