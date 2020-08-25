import React from 'react'
import {Navbar} from 'react-bootstrap'
import stateStore from '../stateStore'
import {view} from 'react-easy-state';
import {withRouter} from 'react-router-dom';
import axios from "axios";
import CustomSelect from "./CustomSelect";

class MainSearchSettings extends React.Component {

    constructor(props) {
        super(props);
        this.default_setup()
    }

    default_setup() {
        stateStore.dict_collection.collection_id = "freedict";
        stateStore.dict_collection.dict_id = "eng_lat";
        stateStore.dict_collection.dict_ids = stateStore.freedict_ids;
        stateStore.search.field = "headword";
        stateStore.search.query_type = "prefix"
    }

    componentDidMount() {
        this.setSpec()
    }

    setSpec() {
        const url = `https://kosh.uni-koeln.de/` + stateStore.dict_collection.collection_id + `/` + stateStore.dict_collection.dict_id + `/restful/spec`;
        console.log(url)
        axios.get(url).then(resp => {
            stateStore.dict_spec.raw = resp.data;
            stateStore.search.fields = stateStore.dict_spec.raw['paths']['/entries']['get']['parameters'][0]['enum'];
            // set default fields to be displayed
            stateStore.results.display_fields = this.initFields(stateStore.search.fields)
            stateStore.search.query_types = stateStore.dict_spec.raw['paths']['/entries']['get']['parameters'][2]['enum'];
        }).catch((error) => {
            console.warn('error fetching spec');
        })

    }

    initFields(fields) {
        var obj = {}
        for (let i = 0; i < fields.length; ++i) {
            obj[fields[i]] = true;
        }

        return obj
    }


    setDictIds = async e => {
        console.log(e.target.value)
        switch (e.target.value) {
            case "Freedict":
                this.default_setup()
                this.setSpec()
                break;
            case "CDSD":
                stateStore.dict_collection.collection_id = "cdsd";
                stateStore.dict_collection.dict_ids = stateStore.cdsd_ids;
                stateStore.dict_collection.dict_id = "ap90";
                stateStore.search.field = "headword";
                stateStore.search.query_type = "prefix";
                this.setSpec()
                break;
            case "Kosh Data":
                stateStore.dict_collection.collection_id = "api";
                stateStore.dict_collection.dict_ids = stateStore.kosh_data_ids;
                stateStore.dict_collection.dict_id = "de_alcedo";
                stateStore.search.field = "lemma";
                stateStore.search.query_type = "prefix";
                this.setSpec()
                break;
            default:
                this.default_setup()
                this.setSpec()
        }

        console.log(stateStore.dict_collection.dict_ids)
    };


    setDictId = e => {
        stateStore.dict_collection.dict_id = e.target.value
        console.log(stateStore.dict_collection.dict_id)
        this.setSpec()

    };

    setField = e => {
        stateStore.search.field = e.target.value
        console.log(stateStore.search.field)
    }

    setQueryType = e => {
        stateStore.search.query_type = e.target.value
        console.log(stateStore.search.field)
    }


    render() {
        return (
            <Navbar expand="lg" sticky="top" className="bg-light">

                <CustomSelect
                    list={stateStore.collection_ids} onc={this.setDictIds}
                    label={"Collection: "}/>

                <CustomSelect
                    list={stateStore.dict_collection.dict_ids} onc={this.setDictId}
                    label={"Dictionary: "} preselected={stateStore.dict_collection.dict_id}/>

                <CustomSelect list={stateStore.search.fields}
                              onc={this.setField}
                              label={"Field: "} preselected={stateStore.search.field}/>

                <CustomSelect
                    list={stateStore.search.query_types} onc={this.setQueryType}
                    label={"Query Type: "} preselected={stateStore.search.query_type}/>


            </Navbar>
        )
    }
}


export default withRouter(view(MainSearchSettings));