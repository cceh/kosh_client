import React from 'react'
import { Navbar } from 'react-bootstrap'
import stateStore from '../stateStore'
import {view} from "@risingstack/react-easy-state";
import {withRouter} from 'react-router-dom';
import axios from "axios";
import CustomSelect from "./CustomSelect";
import CustomDropdown from './CustomDropdown';
import CustomMultiselect from './CustomMultiselect';
import CustomCheckbox from './CustomCheckbox';

class MainSearchSettings extends React.Component {
g
    constructor(props) {
        super(props);
        this.default_setup()
    }

    default_setup() {
        stateStore.dict_collection.base_path = "mpcd";
        stateStore.dict_collection.dict_id = ["mmp"];
        stateStore.dict_collection.dict_ids = stateStore.mpcd_ids;
        stateStore.search.field = "trc";
        stateStore.search.query_type = "wildcard"
    }

    componentDidMount() {
        this.setSpec()
    }

    setSpec() {
        let base_url = 'https://sandbox.cceh.uni-koeln.de/'
        
        const spec_url = base_url + stateStore.dict_collection.base_path + `/` + stateStore.dict_collection.dict_id + `/restful/spec`;
        stateStore.dict_collection.dict_base_url = base_url + stateStore.dict_collection.base_path + `/` + stateStore.dict_collection.dict_id + `/restful`
        console.log(spec_url)
        axios.get(spec_url).then(resp => {
            stateStore.dict_spec.raw = resp.data;
            stateStore.search.fields = stateStore.dict_spec.raw['paths']['/entries']['get']['parameters'][0]['enum'];
            //remove created
            stateStore.search.fields = stateStore.search.fields.filter(item => item !== 'created')
            console.log(stateStore.search.fields.indexOf('trc'))
            let temp = ['trc'];

            for(var i in stateStore.search.fields){
                if(stateStore.search.fields[i] !== 'trc'){
                    temp.push(stateStore.search.fields[i])
                }
            }

            // set default fields to be displayed
            stateStore.results.display_fields = this.initFields(temp)
            stateStore.results.display_fields['xml'] = false
            stateStore.results.display_fields['id'] = false
            console.log(stateStore.results.display_fields);
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
        stateStore.search.field = "trc";
        stateStore.search.query_type = "wildcard"
        this.setSpec()

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
        if (e.target.checked){
            stateStore.dict_collection.dict_id.push(e.target.id)
        }
        else
        {
            stateStore.dict_collection.dict_id.splice(stateStore.dict_collection.dict_id.indexOf(e.target.id),1)
        }
    }
// <CustomMultiselect labels={stateStore.mpcd_ids} preselected={stateStore.dict_collection.dict_id} onc={this.selectedOptions}/>
    render() {
        return (
            <>
            <Navbar expand="lg" sticky="top" className="bg-light">
            <CustomMultiselect labels={stateStore.mpcd_ids} preselected={stateStore.dict_collection.dict_id} onc={this.selectedOptions}/>
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