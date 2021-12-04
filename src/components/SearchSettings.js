import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import MainSearchSettings from "./MainSearchSettings";
import QueryList from './QueryList';
import {Button, Form, FormControl} from "react-bootstrap";
import stateStore from "../stateStore";
import React from "react";
import {search} from "../utils";
import {withRouter} from "react-router-dom";
import {view} from "@risingstack/react-easy-state";

class SearchSettings extends React.Component {


    onChangeHandler = e => {
        stateStore.search.query = []
        stateStore.search.entries = [];
        this.search(e.target.value);
        stateStore.search.value = e.target.value;
    };

    search = async val => {
        stateStore.search.loading = true;
        let base_url = 'https://sandbox.cceh.uni-koeln.de/'
        for (var id in stateStore.dict_collection.dict_id){
            console.log(id, stateStore.dict_collection.dict_id[id])
            const q = base_url + stateStore.dict_collection.base_path + `/` + stateStore.dict_collection.dict_ids[id] + `/restful/entries?field=` + stateStore.search.field + `&query_type=` + stateStore.search.query_type + `&query=${val}&size=` + stateStore.search.query_size;
            console.log(q)
            const results = await search(q);
            const entries = results;
            stateStore.search.query.push(q)
            stateStore.search.entries.push(entries);
            console.log(stateStore.search.entries);
            stateStore.search.loading = false;
        }
    };
    
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <Navbar bg="light" variant="light" expand="lg" sticky="top">
                            <Navbar.Brand href="https://kosh.uni-koeln.de" target="_blank" rel="noopener noreferrer">
                                <img
                                    src="/kosh.png"
                                    width="60px"
                                    height="60px"
                                    alt=""

                                />
                                {' '}  Kosh - APIs for Lexical Data
                            </Navbar.Brand>
                        </Navbar>
                    </Col>
                </Row>
                <Row>
                    <Col><MainSearchSettings/></Col>
                </Row>
                <Row>
                    <Col>
                        <Navbar bg="light" variant="light" expand="lg" sticky="top">
                            <Form onSubmit={(e) => {
                                e.preventDefault();
                            }} inline>
                                <FormControl type="text"
                                value={stateStore.search.value}
                                             onChange={e => this.onChangeHandler(e)}
                                             placeholder="Search for ..." className="mr-sm-2"/>

                                <Button variant="outline-success">Search</Button>
                            </Form>
                        </Navbar>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Navbar bg="light" variant="light" expand="lg" sticky="top">
                            <Navbar.Brand href="https://kosh.uni-koeln.de">Query: </Navbar.Brand>
                            <QueryList queries={stateStore.search.query} />
                        </Navbar>

                    </Col>
                </Row>
                <br/>
            </Container>
        );
    }

}

export default withRouter(view(SearchSettings));