import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import MainSearchSettings from "./MainSearchSettings";
import {Button, Form, FormControl} from "react-bootstrap";
import stateStore from "../stateStore";
import React from "react";
import {search} from "../utils";
import {withRouter} from "react-router-dom";
import {view} from "react-easy-state";

class SearchSettings extends React.Component {

    onChangeHandler = e => {
        this.search(e.target.value);
        stateStore.search.value = e.target.value;
    };

    search = async val => {
        stateStore.search.loading = true;
        let base_url = ''
        if (stateStore.dict_collection.base_path === "dicts") {
            base_url = 'https://api.c-salt.uni-koeln.de/'
        } else {
            base_url = 'https://kosh.uni-koeln.de/'
        }
        const q = base_url + stateStore.dict_collection.base_path + `/` + stateStore.dict_collection.dict_id + `/restful/entries?field=` + stateStore.search.field + `&query_type=` + stateStore.search.query_type + `&query=${val}&size=` + stateStore.search.query_size;
        console.log(q)
        const results = await search(q);
        const entries = results;
        stateStore.search.query = q
        stateStore.search.entries = entries;
        stateStore.search.loading = false;

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
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                    alt=""

                                />
                                {' '}Kosh - APIs for Lexical Data
                            </Navbar.Brand></Navbar>
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
                                <FormControl value={stateStore.search.value}
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
                            <h7><a target="_blank" rel="noopener noreferrer" href={stateStore.search.query}>{stateStore.search.query}</a></h7>
                        </Navbar>

                    </Col>
                </Row>
                <br/>
            </Container>
        );
    }

}

export default withRouter(view(SearchSettings));