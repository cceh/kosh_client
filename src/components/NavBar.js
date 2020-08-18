import React from 'react'
import {Navbar, Form, FormControl, Button} from 'react-bootstrap'
import stateStore from '../stateStore'
import {search} from "../utils";
import {view} from 'react-easy-state';
import {withRouter} from 'react-router-dom';
import axios from "axios";
import CustomSelect from "./CustomSelect";

class NavBar extends React.Component {

    constructor(props) {
        super(props);
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
            stateStore.dict_spec.fields = stateStore.dict_spec.raw['paths']['/entries']['get']['parameters'][0]['enum']
            var created = stateStore.dict_spec.fields.indexOf('created');
            stateStore.dict_spec.fields.splice(created, 1);
            var xml = stateStore.dict_spec.fields.indexOf('xml');
            stateStore.dict_spec.fields.splice(xml, 1);
            var id = stateStore.dict_spec.fields.indexOf('id');
            stateStore.dict_spec.fields.splice(id, 1);
            stateStore.search.query_types = stateStore.dict_spec.raw['paths']['/entries']['get']['parameters'][2]['enum']
        });

    }


    search = async val => {
        stateStore.search.loading = true;
        const results = await search(
            `https://kosh.uni-koeln.de/` + stateStore.dict_collection.collection_id + `/` + stateStore.dict_collection.dict_id + `/restful/entries?field=` + stateStore.search.field + `&query=${val}&query_type=` + stateStore.search.query_type
            )
        ;
        const entries = results;
        stateStore.search.entries = entries;
        stateStore.search.loading = false;

    };


    setDictIds = async e => {
        console.log(e.target.value)
        switch (e.target.value) {


            case "Freedict":
                stateStore.dict_collection.collection_id = "freedict";
                stateStore.dict_collection.dict_ids = stateStore.freedict_ids;
                stateStore.dict_collection.dict_id = "afr_deu";
                stateStore.search.field = "headword";
                this.setSpec()
                break;
            case "CDSD":
                stateStore.dict_collection.collection_id = "cdsd";
                stateStore.dict_collection.dict_ids = stateStore.cdsd_ids;
                stateStore.dict_collection.dict_id = "ap90";
                stateStore.search.field = "headword";
                this.setSpec()
                break;
            case "Kosh Data":
                stateStore.dict_collection.collection_id = "api";
                stateStore.dict_collection.dict_ids = stateStore.kosh_data_ids;
                stateStore.dict_collection.dict_id = "de_alcedo";
                stateStore.search.field = "lemma";
                this.setSpec()
                break;
            default:
                stateStore.dict_collection.dict_ids = stateStore.freedict_ids;
        }

        console.log(stateStore.dict_collection.dict_ids)
    };


    setDictId = e => {
        stateStore.dict_collection.dict_id = e.target.value
        console.log(stateStore.dict_collection.dict_id)
        this.setSpec()
        console.log(stateStore.dict_spec.fields)
    };

    setField = e => {
        stateStore.search.field = e.target.value
        console.log(stateStore.search.field)
    }

    setQueryType = e => {
        stateStore.search.query_type = e.target.value
        console.log(stateStore.search.field)
    }

    onChangeHandler = e => {
        this.search(e.target.value);
        stateStore.search.value = e.target.value;
    };


    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <Navbar bg="light" variant="light" expand="lg" sticky="top">
                            <Navbar.Brand href="#home">
                                <img
                                    src="/kosh.png"
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                    alt=""
                                />
                                Kosh
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <CustomSelect
                                    list={stateStore.collection_ids} onc={this.setDictIds}
                                    label={"Collection: "}/>

                                <CustomSelect
                                    list={stateStore.dict_collection.dict_ids} onc={this.setDictId}
                                    label={"Dictionary: "} preselected={stateStore.dict_collection.dict_id}/>

                                <CustomSelect list={stateStore.dict_spec.fields}
                                              onc={this.setField}
                                              label={"Field: "} preselected={stateStore.search.field}/>

                                <CustomSelect
                                    list={stateStore.search.query_types} onc={this.setQueryType}
                                    label={"Query Type: "} preselected={stateStore.search.query_type}/>


                                <Form onSubmit={(e) => {
                                    e.preventDefault();
                                }} inline>
                                    <FormControl value={stateStore.search.value}
                                                 onChange={e => this.onChangeHandler(e)}
                                                 placeholder="Search for ..." className="mr-sm-2"/>
                                    <Button variant="outline-success">Search</Button>
                                </Form>
                            </Navbar.Collapse>
                        </Navbar>
                        <br/>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(view(NavBar));