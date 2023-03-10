import React from 'react'
import { Navbar } from 'react-bootstrap'
import stateStore from '../stateStore'
import { view } from "@risingstack/react-easy-state";
import { withRouter } from 'react-router-dom';
import axios from "axios";
import CustomSelect from "./CustomSelect";
import CustomMultiselect from './CustomMultiselect';

class MainSearchSettings extends React.Component {

    constructor(props) {
        super(props);
        this.default_setup()
    }

    default_setup() {
        stateStore.dict_collection.base_path = "mpcd";
        stateStore.dict_collection.dict_id = stateStore.mpcd_ids;
        stateStore.dict_collection.dict_ids = stateStore.mpcd_ids;
        stateStore.search.field = "trc";
        stateStore.search.query_type = "wildcard"
    }

    componentDidMount() {
        this.setMultiSpec()
    }

    async setMultiSpec() {
        let base_url = 'https://kosh.uni-koeln.de/'

        // Fetch all available specs
        for (let id in stateStore.dict_collection.dict_ids) {
            const spec_url = base_url + stateStore.dict_collection.base_path + `/` + stateStore.dict_collection.dict_ids[id] + `/restful/spec`;

            const [fields, query_types] = await axios.get(spec_url).then(response => {
                const resp = response.data
                return [
                    resp['paths']['/entries']['get']['parameters'][0]['enum'], 
                    resp['paths']['/entries']['get']['parameters'][2]['enum']
                ]
            }).catch((error) => {
                console.warn('error fetching spec');
                console.error(error)
            })

            // Set available fields
            fields.forEach(field => {
                if (!stateStore.search.fields.includes(field) && field !== "created") {
                    stateStore.search.fields.push(field)
                }
            })

            // Set available query types
            query_types.forEach(type => {
                if (!stateStore.search.query_types.includes(type)) {
                    stateStore.search.query_types.push(type)
                }
            })
        }

        // Set default fields to be displayed as key-value pairs ([id]: true)
        stateStore.results.display_fields = Object.assign({}, ...stateStore.search.fields.map(field => ((field === "id" || field === "xml") ? { [field]: false } : { [field]: true })))
    }

    /*
    setDictIds = async e => {
        console.log(e.target.value)
        switch (e.target.value) {
            case "mpcd":
                this.default_setup()
                this.setSpec()
                break;
            default:
                this.default_setup()
                this.setSpec()
        }
        console.log(stateStore.dict_collection.dict_ids)
    };
    */

    setDictId = e => {
        stateStore.dict_collection.dict_id = e.target.value
        console.log(stateStore.dict_collection.dict_id)
        stateStore.search.field = "trc"
        stateStore.search.query_type = "wildcard"
        this.setMultiSpec()

    };

    setField = e => {
        stateStore.search.field = e.target.value
        console.log(stateStore.search.field)
    }

    setQueryType = e => {
        stateStore.search.query_type = e.target.value
        console.log(stateStore.search.query_type)
    }

    setQuerySize = e => {
        stateStore.search.query_size = e.target.value
        console.log(stateStore.search.query_size)
    }

    selectedOptions = (e) => {
        if (e.target.checked) {
            stateStore.dict_collection.dict_id.push(e.target.id)
        }
        else {
            stateStore.dict_collection.dict_id.splice(stateStore.dict_collection.dict_id.indexOf(e.target.id), 1)
        }
    }
    // <CustomMultiselect labels={stateStore.mpcd_ids} preselected={stateStore.dict_collection.dict_id} onc={this.selectedOptions}/>
    render() {
        return (
            <>
                <Navbar expand="lg" sticky="top" className="bg-light">
                    <CustomMultiselect labels={stateStore.mpcd_ids} preselected={stateStore.dict_collection.dict_ids} onc={this.selectedOptions} />
                </Navbar>
                <Navbar expand="lg" sticky="top" className="bg-light">
                    <CustomSelect list={stateStore.search.fields}
                        onc={this.setField}
                        label={"Field: "} preselected={stateStore.search.field} />
                    <CustomSelect
                        list={stateStore.search.query_types} onc={this.setQueryType}
                        label={"Query Type: "} preselected={stateStore.search.query_type} />
                    <CustomSelect
                        list={stateStore.search.query_sizes} onc={this.setQuerySize}
                        label={"Query Size: "} preselected={stateStore.search.query_size} />
                </Navbar>
            </>
        )
    }
}


export default withRouter(view(MainSearchSettings));